import _ from 'lodash';
import models from "../db/models";


export const createErrorLog = async (error, action, plantId) => {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const data = await models.ErrorLogs.create({
                error,
                action,
                plantId,

            }, {
                transaction,
            })

            if (_.isNil(data)) throw new Error("Não foi possível registrar o erro.")

            return {
                message: "Erro registrado com sucesso!",
                data
            }
        });
    } catch (err) {
        return {
            message: "Houve um problema ao registrar erro.",
            error: err.message
        }
    }
};


export const createActionLog = async (action, beforeChanges, afterChanges, plantId) => {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const data = await models.ActionLogs.create({
                action,
                beforeChanges,
                afterChanges,
                plantId,
            }, {
                transaction,
            })

            if (_.isNil(data)) throw new Error("Não foi possível registrar o evento.")

            return {
                message: "Evento registrado com sucesso!",
                data
            }
        });
    } catch (err) {
        return {
            message: "Houve um erro ao registrar evento.",
            error: err.message
        }
    }
};


export const createSensorLog = async (sensor, measurement, plantId) => {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const data = await models.SensorLogs.create({
                sensor,
                measurement,
                plantId
            }, {
                transaction,
            })

            if (_.isNil(data)) throw new Error("Não foi possível registrar dados do sensor.")

            return {
                message: "Dados do sensor registrado com sucesso!",
                data
            }
        });
    } catch (err) {
        return {
            message: "Houve um erro ao registrar os dados do sensor.",
            error: err.message
        }
    }
};