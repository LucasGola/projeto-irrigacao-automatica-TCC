import _ from 'lodash';
import models from '../../db/models';
import { createErrorLog, createActionLog } from '../createLogs';

export default async function registerEvent(req, res) {
    console.log(" ### POST: Register Event!!")

    const { action, soilHumidity, climateTemperature } = req.body;

    try {
        if (
            _.isNil(action) || _.isNil(soilHumidity) ||
            _.isNil(climateTemperature)) throw new Error("Todos os dados são necessários.")

        const activePlant = await models.Plants.findOne({ where: { isActive: true, deletedAt: null } });

        await models.sequelize.transaction(async (transaction) => {
            const data = await models.IrrigationLogs.create({
                plantId: activePlant.id,
                action,
                soilHumidity,
                climateTemperature
            }, {
                transaction,
            });

            if (_.isNil(data)) throw new Error("Não foi possível registrar o evento de irrigação.")

            await createActionLog("Evento de irrigação registrados.", null, null, activePlant.id)
            return res.status(200).json({
                message: "Evento de irrigação registrados com sucesso!",
                data
            })
        });
    } catch (err) {
        await createErrorLog(err.stack, "Registro de evento de irrigação", null)
        return res.status(500).json({
            message: "Houve um erro ao registrar o evento de irrigação.",
            error: err.message
        })
    }
};