import _ from "lodash";
import models from "../../db/models"
import { createErrorLog, createActionLog } from '../createLogs';

export default async function getPlantsNameAndID(req, res) {
    try {
        const data = await models.Plants.findAll({
            attributes: ['id', 'name'],
            paranoid: false,
        });

        if (_.isNil(data)) throw new Error("Não encontramos nenhuma planta!")

        await createActionLog("Busca dos nomes das plantas", null, null, null)
        return res.status(200).json({
            message: "Plantas localizadas!",
            data
        })

    } catch (err) {
        await createErrorLog(err.stack, "Busca dos nomes das plantas", null)
        return res.status(500).json({
            message: "Ouve um erro ao buscar os nomes das plantas.",
            error: err.message
        })
    }
}
