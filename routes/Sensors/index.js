import { Router } from "express";
import Sensors from "../../controllers/Sensors";

const sensorsRouter = Router();

sensorsRouter.get('/measurements', Sensors.getSensorsTimeline);
sensorsRouter.post('/register-measurement', Sensors.registerMeasurement);

export default sensorsRouter;