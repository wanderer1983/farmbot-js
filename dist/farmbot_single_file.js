var e=require("mqtt");function n(e,n){return Object.keys(n).forEach(function(t){"default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return n[t]}})}),e}function t(e,n,t,r){Object.defineProperty(e,n,{get:t,set:r,enumerable:!0,configurable:!0})}var r=globalThis,o={},i={},s=r.parcelRequire1c57;null==s&&((s=function(e){if(e in o)return o[e].exports;if(e in i){var n=i[e];delete i[e];var t={id:e,exports:{}};return o[e]=t,n.call(t.exports,t,t.exports),t.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){i[e]=n},r.parcelRequire1c57=s);var a=s.register;a("gwFY1",function(e,t){var r=s("h19jY"),o=s("fTGM0"),i=s("3tZ8P"),a=s("jOzD0"),c=s("bFr0L");n(e.exports,r),n(e.exports,o),n(e.exports,i),n(e.exports,a),n(e.exports,c)}),a("h19jY",function(e,n){t(e.exports,"LATEST_VERSION",()=>r),t(e.exports,"DIGITAL",()=>o),t(e.exports,"ANALOG",()=>i);var r=20180209,o=0,i=1}),a("fTGM0",function(n,r){t(n.exports,"Farmbot",()=>m),s("jOzD0");var o=s("8i5S2"),i=s("01gfL"),a=s("iwcyJ");s("gwFY1");var c=s("jOzD0"),u=s("f5H0j"),f=s("dPMce"),d=s("7tZ6d"),p=s("byyGl"),l=s("aWv1W"),i=s("01gfL"),m=function(){function n(t){var r=this;this.getConfig=function(e){return r.config[e]},this.setConfig=function(e,n){r.config[e]=n},this.installFarmware=function(e){return r.send((0,i.rpcRequest)([{kind:"install_farmware",args:{url:e}}]))},this.updateFarmware=function(e){return r.send((0,i.rpcRequest)([{kind:"update_farmware",args:{package:e}}]))},this.removeFarmware=function(e){return r.send((0,i.rpcRequest)([{kind:"remove_farmware",args:{package:e}}]))},this.installFirstPartyFarmware=function(){return r.send((0,i.rpcRequest)([{kind:"install_first_party_farmware",args:{}}]))},this.powerOff=function(){return r.send((0,i.rpcRequest)([{kind:"power_off",args:{}}]))},this.reboot=function(){return r.send((0,i.rpcRequest)([{kind:"reboot",args:{package:"farmbot_os"}}]))},this.rebootFirmware=function(){return r.send((0,i.rpcRequest)([{kind:"reboot",args:{package:"arduino_firmware"}}]))},this.checkUpdates=function(){return r.send((0,i.rpcRequest)([{kind:"check_updates",args:{package:"farmbot_os"}}]))},this.resetOS=function(){return r.publish((0,i.rpcRequest)([{kind:"factory_reset",args:{package:"farmbot_os"}}]))},this.resetMCU=function(){return r.send((0,i.rpcRequest)([{kind:"factory_reset",args:{package:"arduino_firmware"}}]))},this.flashFirmware=function(e){return r.send((0,i.rpcRequest)([{kind:"flash_firmware",args:{package:e}}]))},this.emergencyLock=function(){var e=(0,i.rpcRequest)([{kind:"emergency_lock",args:{}}],i.Priority.HIGHEST);return r.send(e)},this.emergencyUnlock=function(){var e=(0,i.rpcRequest)([{kind:"emergency_unlock",args:{}}],i.Priority.HIGHEST);return r.send(e)},this.execSequence=function(e,n){return void 0===n&&(n=[]),r.send((0,i.rpcRequest)([{kind:"execute",args:{sequence_id:e},body:n}]))},this.execScript=function(e,n){return r.send((0,i.rpcRequest)([{kind:"execute_script",args:{label:e},body:n}]))},this.home=function(e){return r.send((0,i.rpcRequest)([{kind:"home",args:e}]))},this.findHome=function(e){return r.send((0,i.rpcRequest)([{kind:"find_home",args:e}]))},this.moveAbsolute=function(e){var n=e.x,t=e.y,s=e.z,a=e.speed||u.CONFIG_DEFAULTS.speed;return r.send((0,i.rpcRequest)([{kind:"move_absolute",args:{location:(0,o.coordinate)(n,t,s),offset:(0,o.coordinate)(0,0,0),speed:a}}]))},this.moveRelative=function(e){var n=e.x,t=e.y,o=e.z,s=e.speed||u.CONFIG_DEFAULTS.speed;return r.send((0,i.rpcRequest)([{kind:"move_relative",args:{x:n,y:t,z:o,speed:s}}]))},this.writePin=function(e){return r.send((0,i.rpcRequest)([{kind:"write_pin",args:e}]))},this.readPin=function(e){return r.send((0,i.rpcRequest)([{kind:"read_pin",args:e}]))},this.togglePin=function(e){return r.send((0,i.rpcRequest)([{kind:"toggle_pin",args:e}]))},this.readStatus=function(e){return void 0===e&&(e={}),r.send((0,i.rpcRequest)([{kind:"read_status",args:e}]))},this.takePhoto=function(e){return void 0===e&&(e={}),r.send((0,i.rpcRequest)([{kind:"take_photo",args:e}]))},this.sync=function(e){return void 0===e&&(e={}),r.send((0,i.rpcRequest)([{kind:"sync",args:e}]))},this.setZero=function(e){return r.send((0,i.rpcRequest)([{kind:"zero",args:{axis:e}}]))},this.setUserEnv=function(e){var n=Object.keys(e).map(function(n){return{kind:"pair",args:{label:n,value:e[n]||d.Misc.NULL}}});return r.send((0,i.rpcRequest)([{kind:"set_user_env",args:{},body:n}]))},this.sendMessage=function(e,n,t){void 0===t&&(t=[]),r.send((0,i.rpcRequest)([{kind:"send_message",args:{message_type:e,message:n},body:t.map(function(e){return{kind:"channel",args:{channel_name:e}}})}]))},this.setServoAngle=function(e){var n=r.send((0,i.rpcRequest)([{kind:"set_servo_angle",args:e}]));if(![4,5,6,11].includes(e.pin_number))throw Error("Servos only work on pins 4 and 5");if(e.pin_value>180||e.pin_value<0)throw Error("Pin value outside of 0...180 range");return n},this.calibrate=function(e){return r.send((0,i.rpcRequest)([{kind:"calibrate",args:e}]))},this.lua=function(e){return r.send((0,i.rpcRequest)([{kind:"lua",args:{lua:e}}]))},this.event=function(e){return r._events[e]=r._events[e]||[],r._events[e]},this.on=function(e,n,t){void 0===t&&(t=!1),r.event(e).push({value:n,once:t,event:e})},this.emit=function(e,n){var t=[];r.event(e).concat(r.event("*")).forEach(function(r){try{r.value(n,e),r.once||r.event!==e||t.push(r)}catch(n){console.warn("Exception thrown while handling '".concat(e,"' event.")),console.dir(n)}}),0===t.length?delete r._events[e]:r._events[e]=t},this.publish=function(e,n){if(void 0===n&&(n=!0),r.client)r.emit(d.FbjsEventName.sent,e),r.client.publish(r.channel.toDevice,JSON.stringify(e));else if(n)throw Error("Not connected to server")},this.send=function(e){return new Promise(function(n,t){r.publish(e),r.on(e.args.label,function(e){switch(e.kind){case"rpc_ok":return n(e);case"rpc_error":return t(Error((e.body||[]).map(function(e){return e.args.message}).join(", ")));default:throw console.dir(e),Error("Got a bad CeleryScript node.")}},!0)})},this._onmessage=function(e,n){var t=(0,c.bufferToString)(n),o=e.split(d.Misc.MQTT_DELIM),i=r.emit;try{var s=JSON.parse(t);if(o[0]==d.MqttChanName.publicBroadcast)return i(d.MqttChanName.publicBroadcast,s);switch(o[2]){case d.MqttChanName.logs:return i(d.FbjsEventName.logs,s);case d.MqttChanName.status:return i(d.FbjsEventName.status,s);case d.MqttChanName.sync:return i(d.FbjsEventName.sync,s);case d.MqttChanName.pong:return i(o[3],s);default:var a=(0,p.hasLabel)(s)?s.args.label:d.FbjsEventName.malformed;return i(a,s)}}catch(e){console.dir({text:"Could not parse inbound message from MQTT.",error:e}),i(d.FbjsEventName.malformed,t)}},this.ping=function(e,n){return void 0===e&&(e=1e4),void 0===n&&(n=(0,l.timestamp)()),r.setConfig("LAST_PING_OUT",n),r.doPing(n,e)},this.doPing=function(e,n){return Promise.race([new Promise(function(e,t){return setTimeout(function(){return t(-0)},n)}),new Promise(function(n,t){r.on(""+e,function(){var t=(0,l.timestamp)();r.setConfig("LAST_PING_IN",t),n(t-e)},!0);var o=r.channel.ping(e);r.client&&r.client.publish(o,JSON.stringify(e))})])},this.connect=function(){var t=r.config,o=t.mqttUsername,i=t.token,s=t.mqttServer,c=d.Misc.RECONNECT_THROTTLE_MS,u=(0,e.connect)(s,{clean:!0,clientId:"FBJS-".concat(n.VERSION,"-").concat((0,a.uuid)()),password:i,protocolId:"MQTT",protocolVersion:4,reconnectPeriod:c,username:o});r.client=u,r.resources=new f.ResourceAdapter(r,r.config.mqttUsername),u.on("message",r._onmessage),u.on("offline",function(){return r.emit(d.FbjsEventName.offline,{})}),u.on("connect",function(){return r.emit(d.FbjsEventName.online,{})});var p=[r.channel.logs,r.channel.status,r.channel.sync,r.channel.toClient,r.channel.pong];return u.subscribe(p),new Promise(function(e,n){if(r.client)r.client.once("connect",function(){return e(r)});else throw Error("Please connect first.")})},this._events={},this.config=(0,u.generateConfig)(t),this.resources=new f.ResourceAdapter(this,this.config.mqttUsername)}return Object.defineProperty(n.prototype,"channel",{get:function(){var e=this.config.mqttUsername;return{toDevice:"bot/".concat(e,"/").concat(d.MqttChanName.fromClients),toClient:"bot/".concat(e,"/").concat(d.MqttChanName.fromDevice),status:"bot/".concat(e,"/").concat(d.MqttChanName.status),logs:"bot/".concat(e,"/").concat(d.MqttChanName.logs),sync:"bot/".concat(e,"/").concat(d.MqttChanName.sync,"/#"),pong:"bot/".concat(e,"/pong/#"),ping:function(n){return"bot/".concat(e,"/ping/").concat(n)}}},enumerable:!1,configurable:!0}),n.VERSION="15.8.7",n}()}),a("jOzD0",function(e,r){t(e.exports,"stringToBuffer",()=>d),t(e.exports,"bufferToString",()=>l);var o=s("8i5S2"),i=s("byyGl"),a=s("3SNLU"),c=s("4svrT"),u=s("01gfL"),f=s("iwcyJ");function d(e){var n=e.split("").map(function(e){return e.charCodeAt(0)});return new Uint8Array(n)}var p="undefined"!=typeof util&&util.TextDecoder?new util.TextDecoder:"undefined"!=typeof window&&window.TextDecoder?new window.TextDecoder:{decode:function(e){var n=[];return e.forEach(function(e){return n.push(String.fromCharCode(e))}),n.join("")}},l=function(e){return p.decode(e)};n(e.exports,o),n(e.exports,i),n(e.exports,a),n(e.exports,c),n(e.exports,u),n(e.exports,f)}),a("8i5S2",function(e,n){t(e.exports,"coordinate",()=>r);function r(e,n,t){return{kind:"coordinate",args:{x:e,y:n,z:t}}}}),a("byyGl",function(e,n){t(e.exports,"isCeleryScript",()=>o),t(e.exports,"hasLabel",()=>i);var r=function(e){return!!(e&&"object"==typeof e)};function o(e){var n;return r(e)&&"string"==typeof e.kind&&r(n=e)&&!!n.args}function i(e){return!!o(e)&&"string"==typeof e.args.label}}),a("3SNLU",function(e,n){t(e.exports,"isNode",()=>r);function r(){return"undefined"==typeof window}}),a("4svrT",function(e,n){t(e.exports,"pick",()=>r);function r(e,n,t){return e[n]}}),a("01gfL",function(e,n){t(e.exports,"Priority",()=>o),t(e.exports,"rpcRequest",()=>a);var r,o,i=s("iwcyJ");(r=o||(o={}))[r.HIGHEST=9e3]="HIGHEST",r[r.NORMAL=600]="NORMAL",r[r.LOWEST=300]="LOWEST";var a=function(e,n){return void 0===n&&(n=o.NORMAL),{kind:"rpc_request",args:{label:(0,i.uuid)(),priority:n},body:e}}}),a("iwcyJ",function(e,n){t(e.exports,"uuid",()=>r);function r(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=16*Math.random()|0;return("x"===e?n:3&n|8).toString(16)})}}),a("f5H0j",function(e,n){t(e.exports,"CONFIG_DEFAULTS",()=>i),t(e.exports,"generateConfig",()=>c),s("jOzD0");var o=s("3SNLU"),i={speed:100},a=function(e){try{return JSON.parse(atob(e.split(".")[1]))}catch(e){throw console.warn(e),Error("Unable to parse token. Is it properly formatted?")}},c=function(e){if((0,o.isNode)()&&!r.atob)throw Error("NOTE TO NODEJS USERS:\n\nThis library requires an 'atob()' function.\nPlease fix this first.\nSOLUTION: https://github.com/FarmBot/farmbot-js/issues/33");var n=a(e.token);return{speed:e.speed||i.speed,token:e.token,secure:!1!==e.secure,mqttServer:(0,o.isNode)()?"mqtt://".concat(n.mqtt,":1883"):n.mqtt_ws,mqttUsername:n.bot||"MISSING_MQTT_USERNAME",LAST_PING_OUT:0,LAST_PING_IN:0}}}),a("dPMce",function(e,n){t(e.exports,"ResourceAdapter",()=>a),s("gwFY1");var r=s("iwcyJ"),o=s("kGTNw"),i=s("d1UZh"),a=function(e,n){var t=this;this.parent=e,this.username=n,this.destroy=function(e){var n=t.parent.client;return n?t.doDestroy(n,e.kind,e.id):(0,i.rejectRpc)()},this.save=function(e){var n=t.parent.client;return n?t.doSave(n,e):(0,i.rejectRpc)()},this.destroyAll=function(e){return Promise.all(e.map(function(e){return t.destroy(e)}))},this.doDestroy=function(e,n,i){return new Promise(function(s,a){var c=(0,r.uuid)();t.parent.on(c,(0,o.resolveOrReject)(s,a)),e.publish((0,o.outboundChanFor)(t.username,"destroy",n,c,i),"")})},this.doSave=function(e,n){return new Promise(function(i,s){var a=(0,r.uuid)();t.parent.on(a,(0,o.resolveOrReject)(i,s));var c=(0,o.outboundChanFor)(t.username,"save",n.kind,a,n.body.id);e.publish(c,JSON.stringify(n.body))})}}}),a("kGTNw",function(e,n){t(e.exports,"outboundChanFor",()=>r),t(e.exports,"internalError",()=>o),t(e.exports,"resolveOrReject",()=>i);var r=function(e,n,t,r,o){return void 0===o&&(o=0),["bot",e,"resources_v0",n,t,r,o].join("/")},o={kind:"rpc_error",args:{label:"BROWSER_LEVEL_FAILURE"},body:[{kind:"explanation",args:{message:"Tried to perform batch operation before connect."}}]},i=function(e,n){return function(t){return("rpc_ok"==t.kind?e:n)(t)}}}),a("d1UZh",function(e,n){t(e.exports,"rejectRpc",()=>o);var r=s("kGTNw"),o=function(){return Promise.reject(r.internalError)}}),a("7tZ6d",function(e,n){var r,o,i,s,a,c;t(e.exports,"MqttChanName",()=>r),t(e.exports,"FbjsEventName",()=>o),t(e.exports,"Misc",()=>i),(s=r||(r={})).fromApi="from_api",s.fromClients="from_clients",s.fromDevice="from_device",s.logs="logs",s.status="status",s.sync="sync",s.publicBroadcast="public_broadcast",s.pong="pong",(a=o||(o={})).status="status",a.logs="logs",a.malformed="malformed",a.offline="offline",a.online="online",a.publicBroadcast="public_broadcast",a.sent="sent",a.sync="sync",a.remove="remove",(c=i||(i={})).MQTT_DELIM="/",c.NULL="null",c[c.RECONNECT_THROTTLE_MS=1e3]="RECONNECT_THROTTLE_MS"}),a("aWv1W",function(e,n){t(e.exports,"timestamp",()=>r);function r(){return Math.round(new Date().getTime()/100)}}),a("3tZ8P",function(e,n){var r,o;t(e.exports,"Encoder",()=>r),(o=r||(r={}))[o.unknown=-1]="unknown",o[o.quadrature=0]="quadrature",o[o.differential=1]="differential"}),a("bFr0L",function(e,n){var r,o;t(e.exports,"SpecialStatus",()=>r),(o=r||(r={})).DIRTY="DIRTY",o.SAVING="SAVING",o.SAVED=""}),window.fbjs=s("gwFY1");
//# sourceMappingURL=farmbot_single_file.js.map
