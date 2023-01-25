"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClient = void 0;
const mongodb_1 = require("mongodb");
const env_config_1 = __importDefault(require("./env.config"));
const { NODE_ENV, DB_USER, DB_PASSWORD, DB_HOST } = env_config_1.default;
const mongoUri = NODE_ENV === 'production'
    ? `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`
    : `mongodb://localhost:27017`;
exports.dbClient = new mongodb_1.MongoClient(mongoUri);
