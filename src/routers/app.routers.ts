import { Router } from "express";
import driversRoutes from "./drivers/drivers.routes";
import journeysRoutes from "./journeys/journeys.routes";

const router = Router();

router.use('/drivers', driversRoutes);
router.use('/journeys', journeysRoutes);

export default router;