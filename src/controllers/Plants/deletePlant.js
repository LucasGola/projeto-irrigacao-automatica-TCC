import _ from 'lodash';
import models from '../../db/models';
import { createActionLog, createErrorLog } from '../createLogs';

const deletePlant = async (req, res) => {
    const { plantId } = req.body;
    try {
        if (_.isNil(plantId)) throw new Error("É necessário o ID da planta para apaga-la.");

        const plant = await models.Plants.findOne({ where: { id: plantId, deletedAt: null } });
        if (_.isNil(plant)) throw new Error("Nenhuma planta encontrada com o ID fornecido.");

        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Plants.destroy({
                where: {
                    id: plantId,
                    deletedAt: null
                },
            }, {
                transaction
            });
            await createActionLog("Planta deletada", null, null, plantId);
            return res.status(200).json({
                message: "Planta deletada com sucesso!",
                data
            });
        });
    } catch (err) {
        await createErrorLog(err.stack, "Deletar planta", plantId);
        return res.status(500).json({
            message: "Erro ao deletar planta!",
            error: err.message
        });
    }
};

export default deletePlant;
