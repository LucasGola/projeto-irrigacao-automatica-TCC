import _ from 'lodash';
import models from '../../db/models';
import { createErrorLog, createActionLog } from '../createLogs';

const registerPlant = async (req, res) => {
    const { uderID, name, type, idealWaterPercent, minWaterPercent,
        maxWaterPercent, idealWeather, idealTemperatureWeather } = req.body;

    try {
        if (_.isNil(uderID) || _.isNil(name) || _.isNil(type) ||
            _.isNil(idealWaterPercent) || _.isNil(minWaterPercent) ||
            _.isNil(maxWaterPercent) || _.isNil(idealWeather) ||
            _.isNil(idealTemperatureWeather)) throw new Error("Todos os dados são necessários.")

        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Plants.create({
                uderID,
                name,
                type,
                idealWaterPercent,
                minWaterPercent,
                maxWaterPercent,
            }, {
                transaction,
            })

            if (_.isNil(data)) throw new Error("Não foi possível cadastrar a planta.")

            createActionLog("Planta criada.", null, null, data.id)
            return res.status(200).json({
                message: "Planta cadastrada com sucesso!",
                data
            })
        });
    } catch (err) {
        createErrorLog(err.stack, "Criação de planta", null)
        return res.status(500).json({
            message: "Houve um erro ao cadastrar a planta.",
            error: err.message
        })
    }
};


export default registerPlant