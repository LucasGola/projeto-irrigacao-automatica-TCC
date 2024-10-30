import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function getIrrigationEventsTimeline(req, res) {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const data = await models.IrrigationLogs.findAll();

            if (_.isNil(data)) throw new Error("Não encontramos nenhum evento de irrigação.");

            await createActionLog("Busca por eventos de irrigação", null, null, null);
            return res.status(200).json({
                message: "Eventos de irrigação localizado!",
                data
            });
        })

    } catch (err) {
        await createErrorLog(err.stack, "Busca por eventos de irrigação");
        return res.status(500).json({
            message: "Ouve um erro ao buscar o histórico de eventos de irrigação",
            error: err.message
        });
    }
}
