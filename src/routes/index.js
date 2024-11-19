import { Router } from "express";
import plantsRouter from "./Plants";
import sensorsRouter from "./Sensors";
import eventsRouter from "./Events";

const router = Router();

router.use('/plants', plantsRouter);
router.use('/sensors', sensorsRouter);
router.use('/events', eventsRouter);

export default router;