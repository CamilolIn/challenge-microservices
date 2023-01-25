"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversSchema = void 0;
const yup_1 = __importDefault(require("yup"));
class DriversSchema {
    static validate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._schema.validate(payload, { strict: true });
        });
    }
    static cast(payload) {
        return this._schema.cast(payload);
    }
}
exports.DriversSchema = DriversSchema;
DriversSchema._schema = yup_1.default.object({
    name: yup_1.default.string().required(),
    email: yup_1.default.string().email().required(),
    phone_number: yup_1.default.string().required(),
    license_plate: yup_1.default.string().required(),
    location: yup_1.default.object({
        latitude: yup_1.default.number(),
        longitude: yup_1.default.number(),
    }).required(),
    is_available: yup_1.default.boolean().default(true).required(),
    score: yup_1.default.number().min(0).max(5)
});
