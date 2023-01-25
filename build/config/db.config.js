"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClient = void 0;
var mongodb_1 = require("mongodb");
var env_config_1 = __importDefault(require("./env.config"));
var NODE_ENV = env_config_1.default.NODE_ENV, DB_USER = env_config_1.default.DB_USER, DB_PASSWORD = env_config_1.default.DB_PASSWORD, DB_HOST = env_config_1.default.DB_HOST;
var mongoUri = NODE_ENV === 'production'
    ? "mongodb+srv://".concat(DB_USER, ":").concat(DB_PASSWORD, "@").concat(DB_HOST, "/?retryWrites=true&w=majority")
    : "mongodb://localhost:27017";
exports.dbClient = new mongodb_1.MongoClient(mongoUri);
