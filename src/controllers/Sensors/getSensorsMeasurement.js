import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function getSensorsTimeline(req, res) {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const data = await models.SensorLogs.findAll({
                order: [['createdAt', 'DESC']]
            });


            if (_.isNil(data)) throw new Error("Não encontramos nenhum registro de dados de sensores.");

            await createActionLog("Histórico de dados de sensores", null, null, null);
            return res.status(200).json({
                message: "Histórico localizado!",
                data
            });
        })

    } catch (err) {
        await createErrorLog(err.stack, "Histórico de dados de sensores");
        return res.status(500).json({
            message: "Ouve um erro ao buscar o histórico de dados de sensores.",
            error: err.message
        });
    }
}
