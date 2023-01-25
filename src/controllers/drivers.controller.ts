import { Request, Response } from "express";
import { driversDAO } from "../models/daos/drivers/drivers.dao";
import { IAsyncRequestHandler } from "../types/shared.types";

interface IDriversController {
  getAllDrivers: IAsyncRequestHandler
}

class DriversController implements IDriversController {
  constructor() {}

  async getAllDrivers(req: Request, res: Response){
    await driversDAO.getAll();
    res.send("OK");
  }
}

export default new DriversController();