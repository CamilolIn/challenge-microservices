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
Object.defineProperty(exports, "__esModule", { value: true });
exports.driversDAO = exports.DriversDAO = void 0;
const mongo_container_1 = require("../mongo.container");
class DriversDAO extends mongo_container_1.MongoContainer {
    constructor() {
        super();
        this._collectionName = "drivers";
        this._collection = this.db.collection(this._collectionName);
        this._collection.createIndex({ location: "2d" });
    }
    getAll(filterParams = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const drivers = this._collection.find(filterParams).limit(50).toArray();
        });
    }
    getAllDriversFromLocation(location, meters) {
        return __awaiter(this, void 0, void 0, function* () {
            const drivers = yield this._collection.find({
                location: {
                    $near: [location.longitude, location.latitude],
                    $maxDistance: meters
                }
            }).toArray();
            return drivers;
        });
    }
}
exports.DriversDAO = DriversDAO;
exports.driversDAO = new DriversDAO();
