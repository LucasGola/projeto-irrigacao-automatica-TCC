import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function getPlantInfo(req, res) {
    const { id } = req.body;

    try {
        if (_.isNil()) throw new Error("É necessário passar um ID")

        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Plants.findOne({
                where: {
                    id: id,
                },
            })

            if (_.isNil(data)) throw new Error("Não encontramos nenhuma planta com este ID")

            createActionLog("Busca de planta", null, null, id)
            return res.status(200).json({
                message: "Planta localizada!",
                data
            })
        })

    } catch (err) {
        createErrorLog(err.stack, "Busca de planta", id)
        return res.status(500).json({
            message: "Ouve um erro ao buscar os dados da planta.",
            error: err.message
        })
    }
}
