import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function getPlantWaterPercent(req, res) {
    const { plantId } = req.body;

    try {
        if (_.isNil(plantId)) throw new Error("É necessário passar um ID")

        const data = await models.Plants.findOne({
            where: {
                id: plantId,
            },
            attributes: ['minWaterPercent', 'idealWaterPercent']
        });

        if (_.isNil(data)) throw new Error("Não encontramos nenhuma planta com este ID")

        await createActionLog("Busca de planta", null, null, plantId)
        return res.status(200).json({
            message: "Planta localizada!",
            data
        })

    } catch (err) {
        await createErrorLog(err.stack, "Busca de planta", plantId)
        return res.status(500).json({
            message: "Ouve um erro ao buscar os dados da planta.",
            error: err.message
        })
    }
}
