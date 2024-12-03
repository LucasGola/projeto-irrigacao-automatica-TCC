import { Router } from "express";
import Projections from "../../controllers/DataMining";

const projectionsRouter = Router();

projectionsRouter.get('/irrigation', Projections.irrigationProjection);
projectionsRouter.get('/water-consumption', Projections.waterConsumptionProjection);

export default projectionsRouter;