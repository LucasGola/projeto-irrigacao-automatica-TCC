import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function getPlantWaterAndTemperatureInfo(req, res) {
    try {
        const data = await models.Plants.findOne({
            where: {
                isActive: true,
                deletedAt: null
            },
            attributes: ['minWaterPercent', 'idealWaterPercent', 'maxTemperatureClimate', 'minTemperatureClimate'] // TO:DO receber frequência de irrigação
        });

        if (_.isNil(data)) throw new Error("Não encontramos nenhuma planta com este ID")

        await createActionLog("Busca de planta", null, null, data.id)
        return res.status(200).json({
            message: "Planta localizada!",
            data
        })

    } catch (err) {
        await createErrorLog(err.stack, "Busca de planta", null)
        return res.status(500).json({
            message: "Ouve um erro ao buscar os dados da planta.",
            error: err.message
        })
    }
}
