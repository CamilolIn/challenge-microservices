import { Collection, WithId, ObjectId } from "mongodb";
import { IJourney, IJourneyPayload, TJourneyStatus } from "../../../types/journeys.types";
import { JourneysSchema } from "../../schemas/journeys.schema";
import { MongoContainer } from "../mongo.container";

export class JourneysDAO extends MongoContainer {
  private _collectionName = "journeys";
  private _collection: Collection<IJourney>;

  constructor() {
    super();
    this._collection = this.db!.collection(this._collectionName);
    this._collection.createIndex({ start_location: "2dsphere" });
    this._collection.createIndex({ end_location: "2dsphere" });
  }

  async createJourney(payload: IJourneyPayload) {
    const journeyItem = JourneysSchema.cast(payload);
    const insertResponse = await this._collection.insertOne(journeyItem);
    const newJourney: WithId<IJourney> = {
      _id: insertResponse.insertedId,
      ...journeyItem
    };
    return newJourney;
  }

 async updateJourney(status: TJourneyStatus, id: string) {
  const updateJourenyId = await this._collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status : status } }
  )
  return updateJourenyId;
 }

 async findActiveJourney(filterParams = {}) {
  const findActive = await this._collection.find(filterParams).limit(50).toArray();
  return findActive;
 }
}

export const journeysDAO = new JourneysDAO();