import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function getAllPlantInfo(req, res) {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Plants.findAll({
                where: {
                    deletedAt: null
                },
            })

            if (_.isNil(data)) throw new Error("Não foi possível buscar as plantas!")

            await createActionLog("Busca por todas as plantas", null, null, null)
            return res.status(200).json({
                message: "Plantas localizada!",
                data
            })
        })

    } catch (err) {
        await createErrorLog(err.stack, "Busca por todas as plantas", null)
        return res.status(500).json({
            message: "Ouve um erro ao buscar as plantas.",
            error: err.message
        })
    }
}
