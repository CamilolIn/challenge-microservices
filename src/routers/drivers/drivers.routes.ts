import { Router } from "express";
import driversController from "../../controllers/drivers.controller";

const router = Router();

router.get('/', driversController.getAllDrivers);

export default router;