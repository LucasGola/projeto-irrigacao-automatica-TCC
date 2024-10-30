import { Router } from "express";
import Plants from "../../controllers/Plants";

const plantsRouter = Router();

plantsRouter.get('/info', Plants.getPlantInfo);
plantsRouter.get('/water-percent', Plants.getPlantWaterPercent);
plantsRouter.post('/register', Plants.registerPlant);
plantsRouter.put('/update-info', Plants.updatePlantInfo);
plantsRouter.delete('/delete', Plants.deletePlant);

export default plantsRouter;