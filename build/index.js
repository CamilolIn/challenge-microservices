"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var env_config_1 = __importDefault(require("./config/env.config"));
var db_config_1 = require("./config/db.config");
var PORT = +(env_config_1.default.PORT);
var server = app_1.default.listen(PORT, function () {
    db_config_1.dbClient.connect().then(function () {
        console.log("Server is up and listening on port ", PORT);
    });
});
server.on('error', function (error) {
    console.log("Server connection error");
    console.log(error.message);
});
