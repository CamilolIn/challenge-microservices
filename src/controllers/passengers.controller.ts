import { NextFunction, Request, Response } from "express";
import { WithId } from "mongodb";
import { passengersDAO } from "../models/daos/passengers/passengers.dao";
import { IPassengers } from "../types/passengers.types";
import { IAsyncRequestHandler, ISuccessResponse } from "../types/shared.types";
import { HTTP_STATUS, successResponse } from "../utils/api.utils";
import { errorWrapper, HTTP_ERROR } from "../utils/errors.utils";

interface IDriversController {
  getAllPassengers: IAsyncRequestHandler<Response<ISuccessResponse<WithId<IPassengers[]>>>>
  getByID: IAsyncRequestHandler<Response<ISuccessResponse<WithId<IPassengers>>>>
}

class DriversController implements IDriversController {
  constructor() {}

  @errorWrapper()
  async getAllPassengers(req: Request, res: Response, next: NextFunction){
    const response = await passengersDAO.getAll();
    const data = successResponse(response);
    return res.status(data.statusCode).json(data);
  }

  @errorWrapper()
  async getByID(req: Request, res: Response, next: NextFunction){
    const { id } = req.params;
    if (!id ) {
      const errorMessage = "Params `id` are required";
      throw new HTTP_ERROR(HTTP_STATUS.BAD_REQUEST, errorMessage);
    };
    const response = await passengersDAO.getByID(id);
    const data = successResponse(response);
    return res.status(data.statusCode).json(data);
  }
  
}

export default new DriversController();