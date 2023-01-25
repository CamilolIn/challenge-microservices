import { Router } from "express";
import journeysController from "../../controllers/journeys.controller";

const router = Router();

router.post('/', journeysController.createJourney);

export default router;