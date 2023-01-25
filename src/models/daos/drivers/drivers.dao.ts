import { Collection } from "mongodb";
import { MongoContainer } from "../mongo.container";

export class DriversDAO extends MongoContainer {
  private _collectionName = "drivers";
  private _collection: Collection<any>;

  constructor() {
    super();
    this._collection = this.db!.collection(this._collectionName);
  }

  async getAll(filterParams = {}) {
    const cursor = this._collection.find(filterParams).limit(50).toArray(); 
    
  }
}

export const driversDAO = new DriversDAO();