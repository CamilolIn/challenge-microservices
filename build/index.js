"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_config_1 = __importDefault(require("./config/env.config"));
const db_config_1 = require("./config/db.config");
const PORT = +(env_config_1.default.PORT);
const server = app_1.default.listen(PORT, () => {
    db_config_1.dbClient.connect().then(() => {
        console.log("Connected to MongoDB successfully");
        console.log(`Server is up and listening on port `, PORT);
    });
});
server.on('error', (error) => {
    console.log("Server connection error");
    console.log(error.message);
});
