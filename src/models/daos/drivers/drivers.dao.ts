import { Collection, WithId, ObjectId } from "mongodb";
import { IDriver } from "../../../types/drivers.types";
import { ILocation } from "../../../types/shared.types";
import { MongoContainer } from "../mongo.container";

export class DriversDAO extends MongoContainer {
  private _collectionName = "drivers";
  private _collection: Collection<IDriver>;

  constructor() {
    super();
    this._collection = this.db!.collection(this._collectionName);
    this._collection.createIndex({ location: "2dsphere" });
  }

  async getAll(filterParams = {}): Promise<WithId<IDriver>[]>  {
    const drivers = await this._collection.find(filterParams).limit(50).toArray(); 
    return drivers;
  }

  async getByID(id: any){
    const drivers = await this._collection.findOne({_id: new ObjectId(id)}); 
    return drivers;
  }

  async getAllDriversFromLocation(location: ILocation, meters: number): Promise<WithId<IDriver>[]> {
    const drivers = await this._collection.aggregate<WithId<IDriver>>([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [location.longitude, location.latitude ]},
          distanceField: "dist.calculated",
          query: { is_available: true },
          maxDistance: meters,
          spherical: true
        } 
      }
    ]).toArray();
    return drivers;
  }
}

export const driversDAO = new DriversDAO();