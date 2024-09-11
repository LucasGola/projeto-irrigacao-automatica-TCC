import _ from 'lodash';
import models from '../../db/models';
import { createActionLog, createErrorLog } from '../createLogs'

const deletePlant = async (req, res) => {
    const { id } = req.body;

    try {
        if (_.isNil(id)) throw new Error("É necessário o ID da planta para apaga-la.")

        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Products.destroy({
                where: {
                    id,
                },
            }, {
                transaction
            })

            if (_.isNil(data)) throw new Error("Não foi possível apagar a planta.")

            createActionLog("Planta deletada", null, null, id)
            return res.status(200).json({
                message: "Planta deletada com sucesso!",
                data
            })
        })
    } catch (err) {
        createErrorLog(err.stack, "Deletar planta", id)
        return res.status(500).json({
            message: "Erro ao deletar planta!",
            error: err.message
        })
    }
};

export default deletePlant