import { NextFunction, Request, response, Response } from "express";
import { WithId } from "mongodb";
import { driversDAO } from "../models/daos/drivers/drivers.dao";
import { journeysDAO, JourneysDAO } from "../models/daos/journeys/journeys.dao";
import { JourneysSchema } from "../models/schemas/journeys.schema";
import { IJourney, IJourneyPayload } from "../types/journeys.types";
import { IAsyncRequestHandler, ISuccessResponse } from "../types/shared.types";
import { HTTP_STATUS, successResponse } from '../utils/api.utils';
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

  async updateJourenyStatus(req: Request, res:Response, next: NextFunction){
    const { id } = req.params;
    const body = req.body;

    const updateData = await journeysDAO.updateJourney(body.status, id);
    const response = successResponse(updateData, HTTP_STATUS.OK);
    return res.status(HTTP_STATUS.OK).json(response);
  }

  async findAllJourneys(req: Request, res: Response, next: NextFunction){
    const { status } = req.query;
    console.log(status)
    let journeysAll
    if (status)  journeysAll= await journeysDAO.findActiveJourney({status});
    else journeysAll = await journeysDAO.findActiveJourney();
    const response = successResponse(journeysAll, HTTP_STATUS.OK);
    return res.status(HTTP_STATUS.OK).json(response);
  }
}

export default new JourneysController();