import { NextFunction, Request, response, Response } from "express";
import { WithId } from "mongodb";
import { driversDAO } from "../models/daos/drivers/drivers.dao";
import { passengersDAO } from "../models/daos/passengers/passengers.dao";
import { IDriver } from "../types/drivers.types";
import { IAsyncRequestHandler, ISuccessResponse } from "../types/shared.types";
import { HTTP_STATUS, successResponse } from "../utils/api.utils";
import { errorWrapper, HTTP_ERROR } from "../utils/errors.utils";

interface IPassengersController {
  getDriversFromLocation: IAsyncRequestHandler<Response<ISuccessResponse<WithId<IDriver[]>>>>
}

class PassengersController implements IPassengersController {
  constructor() {}

  @errorWrapper()
  async getAllPassengers(req: Request, res: Response, next: NextFunction){
    const passengers = await passengersDAO.getAll();
    const response = successResponse(passengers);
    return res.json(response);
  }

  @errorWrapper()
  async getByID(req: Request, res: Response, next: NextFunction){
    const { id } = req.params;
    if (!id ) {
      const errorMessage = "Param `id` is required";
      throw new HTTP_ERROR(HTTP_STATUS.BAD_REQUEST, errorMessage);
    };
    const passenger = await passengersDAO.getByID(id);
    if (!passenger) {
      const errorMessage = "Passenger not found in our records";
      throw new HTTP_ERROR(HTTP_STATUS.NOT_FOUND, errorMessage);
    }
    const response = successResponse(passenger);
    return res.json(response);
  }

  @errorWrapper()
  async getDriversFromLocation(req: Request, res: Response, next: NextFunction) {
    const {
      limit,
      longitude,
      latitude
    } = req.query;

    if (!limit || !longitude || !latitude) {
      const errorMessage = "Params `limit`, `longitude` and `latitude` are required";
      throw new HTTP_ERROR(HTTP_STATUS.BAD_REQUEST, errorMessage);
    };

    const numberLimit = +limit;
    const numberLongitude = +longitude;
    const numberLatitude = +latitude;

    if (isNaN(numberLimit) || isNaN(numberLongitude) || isNaN(numberLatitude)) {
      const errorMessage = "Params `meters`, `longitude` and `latitude` must be valid numbers";
      throw new HTTP_ERROR(HTTP_STATUS.BAD_REQUEST, errorMessage);
    };


    const drivers = await driversDAO.getDriversNearLocation(
      {
        longitude: numberLongitude,
        latitude: numberLatitude
      }, 
      numberLimit
    );
    const response = successResponse(drivers);
    return res.json(response);
  };
}

export default new PassengersController();