"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoContainer = void 0;
const db_config_1 = require("../../config/db.config");
class MongoContainer {
    constructor() {
        this._instance = null;
        this._databaseName = "taxi24";
        if (!this._instance) {
            this._database = db_config_1.dbClient.db(this._databaseName);
            this._instance = this;
        }
        else {
            return this._instance;
        }
    }
    get db() {
        return this._database;
    }
}
exports.MongoContainer = MongoContainer;
;
