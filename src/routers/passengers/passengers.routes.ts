import { Router } from "express";
import passengersController from "../../controllers/passengers.controller";

const router = Router();

router.get('/', passengersController.getAllPassengers);
router.get('/:id', passengersController.getByID);
router.get('/journey/drivers', passengersController.getDriversFromLocation);

export default router;