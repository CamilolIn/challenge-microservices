import { Collection, WithId, ObjectId } from "mongodb";
import { IPassengers } from "../../../types/passengers.types";
import { ILocation } from "../../../types/shared.types";
import { MongoContainer } from "../mongo.container";

export class PassengersDAO extends MongoContainer {
  private _collectionName = "passengers";
  private _collection: Collection<IPassengers>;

  constructor() {
    super();
    this._collection = this.db!.collection(this._collectionName);
    this._collection.createIndex({ location: "2dsphere" });
  }

  async getAll(filterParams = {}): Promise<WithId<IPassengers>[]>  {
    const drivers = await this._collection.find(filterParams).limit(50).toArray(); 
    return drivers;
  }

  async getByID(id: any){
    const drivers = await this._collection.findOne({_id: new ObjectId(id)}); 
    return drivers;
  }
}

export const passengersDAO = new PassengersDAO();