import { Router } from "express";
import journeysController from "../../controllers/journeys.controller";

const router = Router();

router.get('/', journeysController.findAllJourneys);
router.post('/', journeysController.createJourney);
router.post('/journeyStatus/:id', journeysController.updateJourenyStatus);

export default router;