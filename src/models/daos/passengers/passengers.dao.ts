import { Collection, ObjectId, WithId } from "mongodb";
import { IPassenger } from "../../../types/passengers.types";
import { MongoContainer } from "../mongo.container";

export class PassengersDAO extends MongoContainer {
  private _collectionName = "passengers";
  private _collection: Collection<IPassenger>;

  constructor() {
    super();
    this._collection = this.db!.collection(this._collectionName);
    this._collection.createIndex({ location: "2dsphere" });
  }

  async getAll(filterParams = {}): Promise<WithId<IPassenger>[]>  {
    const passengers = await this._collection.find(filterParams).limit(50).toArray(); 
    return passengers;
  }

  async getByID(id: string): Promise<WithId<IPassenger> | null>{
    const passenger = await this._collection.findOne({_id: new ObjectId(id)}); 
    return passenger;
  }

}

export const passengersDAO = new PassengersDAO();