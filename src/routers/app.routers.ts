import { Router } from "express";
import driversRoutes from "./drivers/drivers.routes";
import journeysRouts from "./journeys/journeys.routes";
import passengersRoutes from "./passengers/passengers.routes";

const router = Router();

router.use('/drivers', driversRoutes);
router.use('/journeys', journeysRouts);
router.use('/passengers', passengersRoutes);

export default router;