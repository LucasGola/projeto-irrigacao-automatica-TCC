import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function updatePlantInfo(req, res) {
    const { plantId, idealWaterPercent, minWaterPercent,
        maxTemperatureClimate, minTemperatureClimate, isActive } = req.body;

    try {
        if (_.isNil(idealWaterPercent) || _.isNil(minWaterPercent) ||
            _.isNil(maxTemperatureClimate) || _.isNil(minTemperatureClimate) ||
            _.isNil(isActive)) throw new Error("Todos os campos são necessários");

        await models.sequelize.transaction(async (transaction) => {
            if (isActive == true) {
                const oldActivePlant = await models.Plants.findOne({ where: { isActive: true, deletedAt: null } });

                if (_.isNil(oldActivePlant)) throw new Error("Não foi possível localizar a antiga planta ativa.");

                const oldActivePlantUpdated = await models.Plants.update({
                    isActive: false,
                    updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                }, {
                    where: {
                        id: oldActivePlant.id,
                        deletedAt: null
                    },
                }, {
                    transaction
                })

                if (_.isNil(oldActivePlantUpdated)) throw new Error("Não foi possível atualizar o status da antiga planta ativa.");
            }

            const plant = await models.Plants.findOne({ where: { id: plantId, deletedAt: null } });
            if (_.isNil(plant)) throw new Error("Nenhuma planta encontrada com o ID fornecido.");

            const oldData = `{
            ${plant.dataValues.idealWaterPercent},
            ${plant.dataValues.minWaterPercent},
            ${plant.dataValues.maxTemperatureClimate},
            ${plant.dataValues.minTemperatureClimate},
        }`

            const newObject = `{
            ${idealWaterPercent},
            ${minWaterPercent},
            ${maxTemperatureClimate},
            ${minTemperatureClimate},
        }`


            const data = await models.Plants.update({
                idealWaterPercent,
                minWaterPercent,
                maxTemperatureClimate,
                minTemperatureClimate,
                isActive,
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
