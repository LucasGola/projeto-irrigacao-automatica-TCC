import _ from 'lodash';
import models from '../../db/models';
import { createErrorLog, createActionLog } from '../createLogs';

const registerPlant = async (req, res) => {
    const { userId, name, type, idealWaterPercent, minWaterPercent,
        maxTemperatureClimate, minTemperatureClimate } = req.body;

    try {
        if (_.isNil(userId) || _.isNil(name) || _.isNil(type) ||
            _.isNil(idealWaterPercent) || _.isNil(minWaterPercent) ||
            _.isNil(maxTemperatureClimate) || _.isNil(minTemperatureClimate)
        ) throw new Error("Todos os dados são necessários.")

        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Plants.create({
                userId,
                name,
                type,
                idealWaterPercent,
                minWaterPercent,
                maxTemperatureClimate,
                minTemperatureClimate,
            }, {
                transaction,
            })

            if (_.isNil(data)) throw new Error("Não foi possível cadastrar a planta.")

            await createActionLog("Planta criada.", null, null, data.id)
            return res.status(200).json({
                message: "Planta cadastrada com sucesso!",
                data
            })
        });
    } catch (err) {
        await createErrorLog(err.stack, "Criação de planta", null)
        return res.status(500).json({
            message: "Houve um erro ao cadastrar a planta.",
            error: err.message
        })
    }
};


export default registerPlant