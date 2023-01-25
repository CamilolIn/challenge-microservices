import { NextFunction, Request, response, Response } from "express";
import { WithId } from "mongodb";
import { driversDAO } from "../models/daos/drivers/drivers.dao";
import { journeysDAO, JourneysDAO } from "../models/daos/journeys/journeys.dao";
import { JourneysSchema } from "../models/schemas/journeys.schema";
import { IJourney, IJourneyPayload } from "../types/journeys.types";
import { IAsyncRequestHandler, ISuccessResponse } from "../types/shared.types";
import { HTTP_STATUS, successResponse } from "../utils/api.utils";
import { errorWrapper, HTTP_ERROR } from "../utils/errors.utils";

interface IJourneysController {
  createJourney: IAsyncRequestHandler<Response<ISuccessResponse<WithId<IJourney>>>>
}

class JourneysController implements IJourneysController {
  constructor() {}

  @errorWrapper()
  async createJourney(req: Request, res: Response, next: NextFunction) {
    const journeyPayload = req.body as IJourneyPayload;
    await JourneysSchema.validate(journeyPayload);
    // Validate driver and passenger
    const newJourney = await journeysDAO.createJourney(journeyPayload);
    const reponse = successResponse(newJourney, HTTP_STATUS.CREATED);
    return res.status(HTTP_STATUS.CREATED).json(reponse);
  };
}

export default new JourneysController();