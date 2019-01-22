"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChanName;
(function (ChanName) {
    ChanName["fromApi"] = "from_api";
    ChanName["fromClients"] = "from_clients";
    ChanName["fromDevice"] = "from_device";
    ChanName["logs"] = "logs";
    ChanName["legacyStatus"] = "status";
    ChanName["statusV8"] = "status_v8";
    ChanName["sync"] = "sync";
})(ChanName = exports.ChanName || (exports.ChanName = {}));
var EventName;
(function (EventName) {
    EventName["legacy_status"] = "legacy_status";
    EventName["logs"] = "logs";
    EventName["malformed"] = "malformed";
    EventName["offline"] = "offline";
    EventName["online"] = "online";
    EventName["sent"] = "sent";
    EventName["status_v8"] = "status_v8";
    EventName["sync"] = "sync";
})(EventName = exports.EventName || (exports.EventName = {}));
