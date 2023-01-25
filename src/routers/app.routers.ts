import { Router } from "express";
import driversRoutes from "./drivers/drivers.routes";

const router = Router();

router.use('/drivers', driversRoutes);

export default router;