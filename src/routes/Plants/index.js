import { Router } from "express";
import Plants from "../../controllers/Plants";

const plantsRouter = Router();

plantsRouter.get('/active-plant-info', Plants.getPlantInfo);
plantsRouter.get('/info/all', Plants.getAllPlantInfo);
plantsRouter.get('/water-and-tempreature-info', Plants.getPlantWaterAndTemperatureInfo);
plantsRouter.get('/plants-names', Plants.getPlantsNameAndID)
plantsRouter.post('/register', Plants.registerPlant);
plantsRouter.put('/update-info', Plants.updatePlantInfo);
plantsRouter.delete('/delete', Plants.deletePlant);

export default plantsRouter;