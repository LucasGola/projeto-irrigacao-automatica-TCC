import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function updatePlantInfo(req, res) {
    const { plantId, name, type, idealWaterPercent, minWaterPercent,
        maxTemperatureClimate, minTemperatureClimate, isActive, irrigationFrequency } = req.body;

    try {
        if (_.isNil(plantId)) throw new Error("É necessário passar o ID da planta!");
        if (_.isNil(name)) throw new Error("O campo 'Nome' é obrigatório!");
        if (_.isNil(type)) throw new Error("O campo 'Tipo' é obrigatório!");
        if (_.isNil(idealWaterPercent)) throw new Error("O campo 'Umidade Ideal' é obrigatório!");
        if (_.isNil(minWaterPercent)) throw new Error("O campo 'Mínimo de Umidade' é obrigatório!");
        if (_.isNil(maxTemperatureClimate)) throw new Error("O campo 'Temperatura Mínima' é obrigatório!");
        if (_.isNil(minTemperatureClimate)) throw new Error("O campo 'Temperatura Máxima' é obrigatório!");
        if (_.isNil(irrigationFrequency)) throw new Error("O campo 'Frequência de Irrigação' é obrigatório!");
        if (_.isNil(isActive)) throw new Error("O campo 'Definir Como Planta Ativa' é obrigatório!");

        await models.sequelize.transaction(async (transaction) => {
            if (isActive == true) {
                const oldActivePlant = await models.Plants.findOne({ where: { isActive: true, deletedAt: null } });

                if (!_.isNil(oldActivePlant) && plantId != oldActivePlant.id) {
                    const oldActivePlantUpdated = await models.Plants.update({
                        isActive: false,
                         
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
            }

            const plant = await models.Plants.findOne({ where: { id: plantId, deletedAt: null } });
            if (_.isNil(plant)) throw new Error("Nenhuma planta encontrada com o ID fornecido.");

            const oldData = `{
                ${plant.dataValues.name},
                ${plant.dataValues.type},
                ${plant.dataValues.idealWaterPercent},
                ${plant.dataValues.minWaterPercent},
                ${plant.dataValues.maxTemperatureClimate},
                ${plant.dataValues.minTemperatureClimate},
                ${plant.dataValues.isActive},
                ${plant.dataValues.irrigationFrequency},
        }`

            const newObject = `{
                ${name},
                ${type},
                ${idealWaterPercent},
                ${minWaterPercent},
                ${maxTemperatureClimate},
                ${minTemperatureClimate},
                ${isActive},
                ${irrigationFrequency},
        }`


            const data = await models.Plants.update({
                name,
                type,
                idealWaterPercent,
                minWaterPercent,
                maxTemperatureClimate,
                minTemperatureClimate,
                isActive,
                irrigationFrequency,
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
        await createErrorLog(err.stack, "Atualização de dados de planta.", null)
        return res.status(500).json({
            message: "Ouve um erro ao atualizar os dados da planta.",
            error: err.message
        })
    }
}
