import * as Corpus from "./corpus";
import {
  connect,
  Client as MqttClient
} from "mqtt";
import {
  rpcRequest,
  coordinate,
  uuid as genUuid
} from "./util";
import {
  Dictionary,
  McuParams,
  Configuration,
  Vector3
} from "./interfaces";
import { pick } from "./util";
import {
  ReadPin,
  WritePin
} from ".";
import {
  FarmBotInternalConfig as Conf,
  FarmbotConstructorParams,
  generateConfig,
  CONFIG_DEFAULTS
} from "./config";
import { ResourceAdapter } from "./resources/resource_adapter";
import { ChanName, EventName } from "./constants";
import { hasLabel } from "./util/is_celery_script";
import { deepUnpack } from "./util/deep_unpack";
type Primitive = string | number | boolean;
export const NULL = "null";

const RECONNECT_THROTTLE = 1000;

/*
 * Clarification for several terms used:
 *  * Farmware: Plug-ins for FarmBot OS. Sometimes referred to as `scripts`.
 *  * Microcontroller: Directly controls and interfaces with motors,
 *        peripherals, sensors, etc. May be on an Arduino or Farmduino board.
 *        Mostly referred to as `arduino`, but also `mcu`.
 */

export class Farmbot {
  /** Storage area for all event handlers */
  private _events: Dictionary<Function[]>;
  private config: Conf;
  public client?: MqttClient;
  public resources: ResourceAdapter;
  static VERSION = "7.0.0-rc3";

  constructor(input: FarmbotConstructorParams) {
    this._events = {};
    this.config = generateConfig(input);
    this.resources = new ResourceAdapter(this, this.config.mqttUsername);
  }

  /** Get a Farmbot Constructor Parameter. */
  getConfig = <U extends keyof Conf>(key: U): Conf[U] => this.config[key];

  /** Set a Farmbot Constructor Parameter. */
  setConfig = <U extends keyof Conf>(key: U, value: Conf[U]) => {
    this.config[key] = value;
  }

  /**
   * Installs a "Farmware" (plugin) onto the bot's SD card.
   * URL must point to a valid Farmware manifest JSON document.
   */
  installFarmware = (url: string) => {
    return this.send(rpcRequest([{ kind: "install_farmware", args: { url } }]));
  }

  /**
   * Checks for updates on a particular Farmware plugin when given the name of
   * a Farmware. `updateFarmware("take-photo")`
   */
  updateFarmware = (pkg: string) => {
    return this.send(rpcRequest([{
      kind: "update_farmware",
      args: { package: pkg }
    }]));
  }

  /** Uninstall a Farmware plugin. */
  removeFarmware = (pkg: string) => {
    return this.send(rpcRequest([{
      kind: "remove_farmware",
      args: { package: pkg }
    }]));
  }

  /**
   * Installs "Farmware" (plugins) authored by FarmBot, Inc.
   * onto the bot's SD card.
   */
  installFirstPartyFarmware = () => {
    return this.send(rpcRequest([{
      kind: "install_first_party_farmware",
      args: {}
    }]));
  }

  /**
   * Deactivate FarmBot OS completely (shutdown).
   * Useful before unplugging the power.
   */
  powerOff = () => {
    return this.send(rpcRequest([{ kind: "power_off", args: {} }]));
  }

  /** Restart FarmBot OS. */
  reboot = () => {
    return this.send(rpcRequest([
      { kind: "reboot", args: { package: "farmbot_os" } }
    ]));
  }

  /** Reinitialize the FarmBot microcontroller firmware. */
  rebootFirmware = () => {
    return this.send(rpcRequest([
      { kind: "reboot", args: { package: "arduino_firmware" } }
    ]));
  }

  /** Check for new versions of FarmBot OS.
   * Downloads and installs if available. */
  checkUpdates = () => {
    return this.send(rpcRequest([
      { kind: "check_updates", args: { package: "farmbot_os" } }
    ]));
  }

  /** THIS WILL RESET THE SD CARD, deleting all non-factory data!
   * Be careful!! */
  resetOS = () => {
    return this.publish(rpcRequest([
      { kind: "factory_reset", args: { package: "farmbot_os" } }
    ]));
  }

  /** WARNING: will reset all firmware (hardware) settings! */
  resetMCU = () => {
    return this.send(rpcRequest([
      { kind: "factory_reset", args: { package: "arduino_firmware" } }
    ]));
  }

  /**
   * Lock the bot from moving (E-STOP). Turns off peripherals and motors. This
   * also will pause running regimens and cause any running sequences to exit.
   */
  emergencyLock = () => {
    return this.send(rpcRequest([{ kind: "emergency_lock", args: {} }]));
  }

  /** Unlock the bot when the user says it is safe. */
  emergencyUnlock = () => {
    return this.send(rpcRequest([{ kind: "emergency_unlock", args: {} }]));
  }
  /** Execute a sequence by its ID on the FarmBot API. */
  execSequence =
    (sequence_id: number, body: Corpus.VariableDeclaration[] = []) => {
      return this.send(rpcRequest([
        { kind: "execute", args: { sequence_id }, body }
      ]));
    }

  /** Run an installed Farmware plugin on the SD Card. */
  execScript = (
    /** Name of the Farmware. */
    label: string,
    /** Optional ENV vars to pass the Farmware. */
    envVars?: Corpus.Pair[] | undefined) => {
    return this.send(rpcRequest([
      { kind: "execute_script", args: { label }, body: envVars }
    ]));
  }

  /** Bring a particular axis (or all of them) to position 0 in Z Y X order. */
  home = (args: { speed: number, axis: Corpus.ALLOWED_AXIS }) => {
    return this.send(rpcRequest([{ kind: "home", args }]));
  }

  /** Use end stops or encoders to figure out where 0,0,0 is in Z Y X axis
   * order. WON'T WORK WITHOUT ENCODERS OR END STOPS! A blockage or stall
   * during this command will set that position as zero. Use carefully. */
  findHome = (args: { speed: number, axis: Corpus.ALLOWED_AXIS }) => {
    return this.send(rpcRequest([{ kind: "find_home", args }]));
  }

  /** Move FarmBot to an absolute point. */
  moveAbsolute = (args: Vector3 & { speed?: number }) => {
    const { x, y, z } = args;
    const speed = args.speed || CONFIG_DEFAULTS.speed;
    return this.send(rpcRequest([
      {
        kind: "move_absolute",
        args: {
          location: coordinate(x, y, z),
          offset: coordinate(0, 0, 0),
          speed
        }
      }
    ]));
  }

  /** Move FarmBot to position relative to its current position. */
  moveRelative = (args: Vector3 & { speed?: number }) => {
    const { x, y, z } = args;
    const speed = args.speed || CONFIG_DEFAULTS.speed;
    return this.send(rpcRequest([
      { kind: "move_relative", args: { x, y, z, speed } }
    ]));
  }

  /** Set a GPIO pin to a particular value. */
  writePin = (args: WritePin["args"]) => {
    return this.send(rpcRequest([{ kind: "write_pin", args }]));
  }

  /** Read the value of a GPIO pin. Will create a SensorReading if it's
   * a sensor. */
  readPin = (args: ReadPin["args"]) => {
    return this.send(rpcRequest([{ kind: "read_pin", args }]));
  }

  /** Reverse the value of a digital pin. */
  togglePin = (args: { pin_number: number; }) => {
    return this.send(rpcRequest([{ kind: "toggle_pin", args }]));
  }

  /** Read the status of the bot. Should not be needed unless you are first
   * logging in to the device, since the device pushes new states out on
   * every update. */
  readStatus = (args = {}) => {
    return this.send(rpcRequest([{ kind: "read_status", args }]));
  }

  /** Snap a photo and send to the API for post processing. */
  takePhoto =
    (args = {}) => this.send(rpcRequest([{ kind: "take_photo", args }]));

  /** Download/apply all of the latest FarmBot API JSON resources (plants,
   * account info, etc.) to the device. */
  sync = (args = {}) => this.send(rpcRequest([{ kind: "sync", args }]));

  /**
   * Set the current position of the given axis to 0.
   * Example: Sending `bot.setZero("x")` at x: 255 will translate position
   * 255 to 0, causing that position to be x: 0.
   */
  setZero = (axis: Corpus.ALLOWED_AXIS) => {
    return this.send(rpcRequest([{
      kind: "zero",
      args: { axis }
    }]));
  }

  /** Update FarmBot microcontroller settings. */
  updateMcu = (update: Partial<McuParams>) => {
    const body: Corpus.RpcRequestBodyItem[] = [];
    Object
      .keys(update)
      .forEach(function (label) {
        const value = pick<Primitive>(update, label, "ERROR");
        body.push({
          kind: "config_update",
          args: { package: "arduino_firmware" },
          body: [{ kind: "pair", args: { value, label } }]
        });
      });
    return this.send(rpcRequest(body));
  }

  /**
   * Set user ENV vars (usually used by 3rd-party Farmware plugins).
   * Set value to `undefined` to unset.
   */
  setUserEnv = (configs: Dictionary<(string | undefined)>) => {
    const body = Object
      .keys(configs)
      .map(function (label): Corpus.Pair {
        return {
          kind: "pair",
          args: { label, value: (configs[label] || NULL) }
        };
      });
    return this.send(rpcRequest([{ kind: "set_user_env", args: {}, body }]));
  }

  /** Control servos on pins 4 and 5. */
  setServoAngle = (args: { pin_number: number; pin_value: number; }) => {
    const result = this.send(rpcRequest([{ kind: "set_servo_angle", args }]));

    // Celery script can't validate `pin_number` and `pin_value` the way we need
    // for `set_servo_angle`. We will send the RPC command off, but also
    // crash the client to aid debugging.
    if (![4, 5].includes(args.pin_number)) {
      throw new Error("Servos only work on pins 4 and 5");
    }

    if (args.pin_value > 360 || args.pin_value < 0) {
      throw new Error("Pin value outside of 0...360 range");
    }

    return result;
  }

  /** Update a config option (setting) for FarmBot OS. */
  updateConfig = (update: Partial<Configuration>) => {
    const body = Object
      .keys(update)
      .map((label): Corpus.Pair => {
        const value = pick<Primitive>(update, label, "ERROR");
        return { kind: "pair", args: { value, label } };
      });

    return this.send(rpcRequest([{
      kind: "config_update",
      args: { package: "farmbot_os" },
      body
    }]));
  }

  /**
   * Find the axis extents using encoder, motor, or end-stop feedback.
   * Will set a new home position and a new axis length for the given axis.
   */
  calibrate = (args: { axis: Corpus.ALLOWED_AXIS }) => {
    return this.send(rpcRequest([{ kind: "calibrate", args }]));
  }

  /** Tell the bot to send diagnostic info to the API.*/
  dumpInfo = () => {
    return this.send(rpcRequest([{
      kind: "dump_info",
      args: {}
    }]));
  }

  /**
   * Retrieves all of the event handlers for a particular event.
   * Returns an empty array if the event did not exist.
   */
  event = (name: string) => {
    this._events[name] = this._events[name] || [];
    return this._events[name];
  }

  on = (event: string, callback: Function) => this.event(event).push(callback);

  emit = (event: string, data: {}) => {
    [this.event(event), this.event("*")]
      .forEach(function (handlers) {
        handlers.forEach(function (handler: Function) {
          try {
            handler(data, event);
          } catch (e) {
            const msg = `Exception thrown while handling '${event} event.`;
            console.warn(msg);
            console.dir(e);
          }
        });
      });
  }

  /** Dictionary of all relevant MQTT channels the bot uses. */
  get channel() {
    const deviceName = this.config.mqttUsername;
    return {
      /** From the browser, usually. */
      toDevice: `bot/${deviceName}/${ChanName.fromClients}`,
      /** From farmbot */
      toClient: `bot/${deviceName}/${ChanName.fromDevice}`,
      legacyStatus: `bot/${deviceName}/${ChanName.legacyStatus}`,
      logs: `bot/${deviceName}/${ChanName.logs}`,
      fromAPI: `bot/${deviceName}/${ChanName.fromApi}`,
      status: `bot/${deviceName}/${ChanName.statusV8}/#`,
      sync: `bot/${deviceName}/${ChanName.sync}/#`,
    };
  }

  /** Low-level means of sending MQTT packets. Does not check format. Does not
   * acknowledge confirmation. Probably not the one you want. */
  publish = (msg: Corpus.RpcRequest, important = true): void => {
    if (this.client) {
      this.emit(EventName.sent, msg);
      /** SEE: https://github.com/mqttjs/MQTT.js#client */
      this.client.publish(this.channel.toDevice, JSON.stringify(msg));
    } else {
      if (important) {
        throw new Error("Not connected to server");
      }
    }
  }

  /** Low-level means of sending MQTT RPC commands to the bot. Acknowledges
   * receipt of message, but does not check formatting. Consider using higher
   * level methods like .moveRelative(), .calibrate(), etc....
  */
  send = (input: Corpus.RpcRequest) => {
    return new Promise((resolve, reject) => {

      this.publish(input);

      function handler(response: Corpus.RpcOk | Corpus.RpcError) {
        switch (response.kind) {
          case "rpc_ok": return resolve(response);
          case "rpc_error":
            const reason = (response.body || [])
              .map(x => x.args.message)
              .join(", ");
            return reject(new Error("Problem sending RPC command: " + reason));
          default:
            console.dir(response);
            throw new Error("Got a bad CeleryScript node.");
        }
      }

      this.on(input.args.label, handler);
    });
  }

  /** Main entry point for all MQTT packets. */
  private _onmessage = (chan: string, buffer: Uint8Array) => {
    try {
      const msg = JSON.parse(buffer.toString());
      switch (chan.split(".")[2]) {
        case ChanName.logs:
          return this.emit(EventName.logs, msg);

        case ChanName.legacyStatus:
          return this.emit(EventName.legacy_status, msg);

        case ChanName.statusV8:
          const path = chan.split("/").slice(3).join(".");
          return this
            .emit(EventName.status_v8, deepUnpack(path, msg));

        case ChanName.sync:
          return this.emit(EventName.sync, msg);

        default:
          const event = hasLabel(msg) ?
            msg.args.label : EventName.malformed;
          return this.emit(event, msg);
      }
    } catch (error) {
      console.warn("Could not parse inbound message from MQTT.");
      this.emit(EventName.malformed, buffer.toString());
    }
  }

  /** Bootstrap the device onto the MQTT broker. */
  connect = () => {
    const { mqttUsername, token, mqttServer } = this.config;
    const client = connect(mqttServer, {
      username: mqttUsername,
      password: token,
      clean: true,
      clientId: `FBJS-${Farmbot.VERSION}-${genUuid()}`,
      reconnectPeriod: RECONNECT_THROTTLE
    });
    this.client = client;
    this.resources = new ResourceAdapter(this, this.config.mqttUsername);
    client.on("message", this._onmessage);
    client.on("offline", () => this.emit(EventName.offline, {}));
    client.on("connect", () => this.emit(EventName.online, {}));
    const channels = [
      this.channel.fromAPI,
      this.channel.logs,
      this.channel.legacyStatus,
      this.channel.sync,
      this.channel.toClient,
    ];
    client.subscribe(channels);
    return new Promise((resolve, _reject) => {
      const { client } = this;
      if (client) {
        client.once("connect", () => resolve(this));
      } else {
        throw new Error("Please connect first.");
      }
    });
  }
}
