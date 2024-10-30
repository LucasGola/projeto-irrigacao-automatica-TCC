import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function updatePlantInfo(req, res) {
    const { plantId, idealWaterPercent, minWaterPercent, idealTemperatureWeather } = req.body;

    try {
        if (_.isNil(idealWaterPercent) || _.isNil(minWaterPercent) ||
            _.isNil(idealTemperatureWeather)) throw new Error("Todos os campos são necessários");

        const plant = await models.Plants.findOne({ where: { id: plantId, deletedAt: null } });
        if (_.isNil(plant)) throw new Error("Nenhuma planta encontrada com o ID fornecido.");

        const oldData = `{
            ${plant.dataValues.idealWaterPercent},
            ${plant.dataValues.minWaterPercent},
            ${plant.dataValues.idealTemperatureWeather},
        }`

        const newObject = `{
            ${idealWaterPercent},
            ${minWaterPercent},
            ${idealTemperatureWeather},
        }`

        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Plants.update({
                idealWaterPercent,
                minWaterPercent,
                idealTemperatureWeather,
                updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            }, {
                where: {
                    id: plantId,
                    deletedAt: null
                },
            }, {
                transaction
            })

            if (_.isNil(data)) throw new Error("Não Foi possível atualizar os dados da planta!")

            const newPlantData = await models.Plants.findOne({ where: { id: plantId, deletedAt: null } });

            await createActionLog("Dados da planta atualizados!", oldData, newObject, plantId)
            return res.status(200).json({
                message: "Planta localizada!",
                newPlantData
            })
        })

    } catch (err) {
        await createErrorLog(err.stack, "Atualização de dados de planta.", plantId)
        return res.status(500).json({
            message: "Ouve um erro ao atualizar os dados da planta.",
            error: err.message
        })
    }
}
