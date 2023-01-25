import { NextFunction, Request, Response } from "express";
import { WithId } from "mongodb";
import { driversDAO } from "../models/daos/drivers/drivers.dao";
import { IDriver } from "../types/drivers.types";
import { IAsyncRequestHandler, ISuccessResponse } from "../types/shared.types";
import { HTTP_STATUS, successResponse } from "../utils/api.utils";
import { errorWrapper, HTTP_ERROR } from "../utils/errors.utils";

interface IDriversController {
  getAllDrivers: IAsyncRequestHandler<Response<ISuccessResponse<WithId<IDriver[]>>>>
  getByID: IAsyncRequestHandler<Response<ISuccessResponse<WithId<IDriver>>>>
  getAllDriversFromLocation: IAsyncRequestHandler<Response<ISuccessResponse<WithId<IDriver[]>>>>
}

class DriversController implements IDriversController {
  constructor() {}

  @errorWrapper()
  async getAllDrivers(req: Request, res: Response, next: NextFunction){
    const { available } = req.query;
    const filterParams = available ? { is_available: available } : {};
    const drivers = await driversDAO.getAll(filterParams);
    const response = successResponse(drivers);
    return res.json(response);
  }

  @errorWrapper()
  async getByID(req: Request, res: Response, next: NextFunction){
    const { id } = req.params;
    if (!id ) {
      const errorMessage = "Params `id` are required";
      throw new HTTP_ERROR(HTTP_STATUS.BAD_REQUEST, errorMessage);
    };
    const driver = await driversDAO.getByID(id);
    if (!driver) {
      const errorMessage = "Driver not found in our records"
      throw new HTTP_ERROR(HTTP_STATUS.NOT_FOUND, errorMessage);
    }
    const response = successResponse(driver);
    return res.json(response);
  }

  @errorWrapper()
  async getAllDriversFromLocation(req: Request, res: Response, next: NextFunction){
    const {
      meters,
      longitude,
      latitude
    } = req.query;
    
    if (!meters || !longitude || !latitude) {
      const errorMessage = "Params `meters`, `longitude` and `latitude` are required";
      throw new HTTP_ERROR(HTTP_STATUS.BAD_REQUEST, errorMessage);
    };

    const numberMeters = +meters;
    const numberLongitude = +longitude;
    const numberLatitude = +latitude;

    if (isNaN(numberMeters) || isNaN(numberLongitude) || isNaN(numberLatitude)) {
      const errorMessage = "Params `meters`, `longitude` and `latitude` must be valid numbers";
      throw new HTTP_ERROR(HTTP_STATUS.BAD_REQUEST, errorMessage);
    };

    const drivers = await driversDAO.getAllDriversFromLocation(
      {
        longitude: numberLongitude,
        latitude: numberLatitude
      }, 
      numberMeters
    );
    const response = successResponse(drivers);
    return res.status(response.statusCode).json(response);
  }
}

export default new DriversController();