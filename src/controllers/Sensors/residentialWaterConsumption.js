import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';
const { Op } = require('sequelize');

export default async function residentialWaterConsumption(req, res) {
    try {
        await models.sequelize.transaction(async (transaction) => {

            const data = await models.SensorLogs.findAll({
                where: {
                    sensor: "Vazão D'Água",
                    measurement: {
                        [Op.ne]: 0
                    }
                },
                attributes: ["measurement", "createdAt"]
            });



            if (_.isNil(data)) throw new Error("Não encontramos nenhum registro de dados do sensor de vazão d'água.");

            await createActionLog("Registros de dados do sensor de vazão d'água", null, null, null);
            return res.status(200).json({
                message: "Histórico localizado!",
                data
            });
        })

    } catch (err) {
        await createErrorLog(err.stack, "Registros de dados do sensor de vazão d'água");
        return res.status(500).json({
            message: "Ouve um erro ao buscar os registros de dados do sensor de vazão d'água.",
            error: err.message
        });
    }
}
