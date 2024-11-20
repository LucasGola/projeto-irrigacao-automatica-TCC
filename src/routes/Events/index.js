import { Router } from "express";
import Events from "../../controllers/Events";

const eventsRouter = Router();

eventsRouter.get('/timeline', Events.getIrrigationEventsTimeline);
eventsRouter.post('/register', Events.registerEvent);

export default eventsRouter;