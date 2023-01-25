import { Collection, WithId } from "mongodb";
import { IJourney, IJourneyPayload } from "../../../types/journeys.types";
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
}

export const journeysDAO = new JourneysDAO();