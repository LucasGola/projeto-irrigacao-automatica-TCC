import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';
const { Op } = require('sequelize');

export default async function getPlantWaterAndTemperatureInfo(req, res) {
    console.log(" ### GET: Plant irrigation configs!!")

    try {
        const plantData = await models.Plants.findOne({
            where: {
                isActive: true,
                deletedAt: null
            },
            attributes: ['id', 'minWaterPercent', 'idealWaterPercent', 'maxTemperatureClimate', 'minTemperatureClimate', 'irrigationFrequency']
        });

        if (_.isNil(plantData)) throw new Error("Não encontramos nenhuma planta ativa!")

        const lastIrrigationDate = await models.IrrigationLogs.findOne({
            where: {
                plantId: plantData.id,
                action: { [Op.or]: ["Planta irrigada com água encanada!", "Planta irrigada com água da chuva!"] }
            },
            order: [['createdAt', 'DESC']],
            attributes: ['createdAt']
        });

        await createActionLog("Busca de planta", null, null, plantData.id)
        console.log((lastIrrigationDate == null) ? "none" : lastIrrigationDate.createdAt)
        return res.status(200).json({
            message: "Planta localizada!",
            data: {
                ...plantData.dataValues,
                lastIrrigation: (lastIrrigationDate == null) ? "none" : lastIrrigationDate.createdAt,
            }
        })

    } catch (err) {
        await createErrorLog(err.stack, "Busca de planta", null)
        return res.status(500).json({
            message: "Ouve um erro ao buscar os dados da planta.",
            error: err.message
        })
    }
}
