import models from '../../db/models';
import { SimpleLinearRegression } from 'ml-regression';
import { createErrorLog, createActionLog } from '../createLogs'; // Adicionando os imports


function calculateNextIrrigationWithRegression(events) {
    const irrigationEvents = events.filter(event => event.action.includes("irrigada"));

    if (irrigationEvents.length < 2) {
        throw new Error("Não há events de irrigação suficientes para realizar a projeção.");
    }

    // Ordena os events por data
    irrigationEvents.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // Converte as datas para timestamps e calcula os intervals entre events
    const timestamps = irrigationEvents.map(event => new Date(event.createdAt).getTime());
    const intervals = [];
    for (let i = 1; i < timestamps.length; i++) {
        intervals.push(timestamps[i] - timestamps[i - 1]);
    }

    // Prepara os dados para regressão
    const x = intervals.map((intervalo, index) => index);
    const y = intervals;

    // Treina o modelo de regressão linear
    const regression = new SimpleLinearRegression(x, y);

    // Projeta os próximos events de irrigação para os próximos 3 meses
    const nextDate = [];
    let lastEvent = new Date(irrigationEvents[irrigationEvents.length - 1].createdAt);
    const threeMonths = 3 * 30 * 24 * 60 * 60 * 1000; // Três meses em milissegundos
    const deadLine = lastEvent.getTime() + threeMonths;

    while (lastEvent.getTime() < deadLine) {
        const nextInterval = regression.predict(nextDate.length);
        lastEvent = new Date(lastEvent.getTime() + nextInterval);
        nextDate.push(lastEvent);
    }

    return nextDate;
}

export default async function irrigationProjection(req, res) {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const events = await await models.IrrigationLogs.findAll();

            if (!events || events.length === 0) {
                throw new Error("Não encontramos nenhum event de irrigação.");
            }

            const projection = calculateNextIrrigationWithRegression(events);

            await createActionLog("Projeção de irrigação", null, null, null);
            return res.status(200).json({
                message: "Projeção de irrigação concluída!",
                projection
            });
        });

    } catch (err) {
        await createErrorLog(err.stack, "Projeção de irrigação");
        return res.status(500).json({
            message: "Ocorreu um erro ao projetar dados de irrigação",
            error: err.message
        });
    }
}
