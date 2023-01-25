import { Db } from "mongodb";
import { dbClient } from "../../config/db.config";

export class MongoContainer {
  private _instance: MongoContainer | null = null;
  private _databaseName = "taxi24";
  private _database: Db | undefined;

  constructor() {
    if (!this._instance) {
      this._database = dbClient.db(this._databaseName);
      this._instance = this;
    } else {
      return this._instance;
    }
  }

  get db() {
    return this._database;
  }
};
