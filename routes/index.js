import { Router } from "express";
import Plants from "../controllers/Plants"

const router = Router();

router.get('/plant-info', Plants.getPlantInfo)

export default router;