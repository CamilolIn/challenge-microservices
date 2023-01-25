import { Router } from "express";
import driversController from "../../controllers/drivers.controller";

const router = Router();

router.get('/', driversController.getAllDrivers);
router.get('/:id', driversController.getByID)
router.get('/location', driversController.getAllDriversFromLocation);

export default router;