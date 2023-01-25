import { Router } from "express";
import passengersController from "../../controllers/passengers.controller";

const router = Router();

router.get('/', passengersController.getAllPassengers);
router.get('/:id', passengersController.getByID);

export default router;