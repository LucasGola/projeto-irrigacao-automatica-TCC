import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function getPlantInfo(req, res) {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Plants.findOne({
                where: {
                    isActive: true,
                    deletedAt: null
                },
            })

            if (_.isNil(data)) throw new Error("Não encontramos nenhuma planta com este ID")

            await createActionLog("Busca de planta", null, null, data.id)
            return res.status(200).json({
                message: "Planta localizada!",
                data
            })
        })

    } catch (err) {
        await createErrorLog(err.stack, "Busca de planta", null)
        return res.status(500).json({
            message: "Ouve um erro ao buscar os dados da planta.",
            error: err.message
        })
    }
}
