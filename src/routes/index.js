import { Router } from "express";
import plantsRouter from "./Plants";
import sensorsRouter from "./Sensors";
import eventsRouter from "./Events";
import projectionsRouter from './Projections'

const router = Router();

router.use('/plants', plantsRouter);
router.use('/sensors', sensorsRouter);
router.use('/events', eventsRouter);
router.use('/projections', projectionsRouter);

export default router;