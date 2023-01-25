import { Router } from "express";
import driversRoutes from "./drivers/drivers.routes";
import passengersRoutes from "./passengers/passengers.routes";
import journeysRoutes from "./journeys/journeys.routes";

const router = Router();

router.use('/drivers', driversRoutes);
router.use('/passengers', passengersRoutes);
router.use('/journeys', journeysRoutes);

export default router;