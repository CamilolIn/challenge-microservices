import { Router } from "express";
import driversRoutes from "./drivers/drivers.routes";
import journeysRoutes from "./journeys/journeys.routes";
import passengerRoutes from "./passengers/passengers.routes";

const router = Router();

router.use('/drivers', driversRoutes);
router.use('/journeys', journeysRoutes);
router.use('/passengers', passengerRoutes);

export default router;