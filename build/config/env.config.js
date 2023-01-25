"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var nodeEnv = ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) || 'development';
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), "".concat(nodeEnv, ".env"))
});
exports.default = {
    NODE_ENV: nodeEnv,
    PORT: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 8080,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD
};
