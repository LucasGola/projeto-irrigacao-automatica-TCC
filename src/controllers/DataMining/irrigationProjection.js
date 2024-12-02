import models from '../../db/models';
import moment from 'moment';
import { SimpleLinearRegression } from 'ml-regression';
import { createErrorLog, createActionLog } from '../createLogs'; // Adicionando os imports

async function getIrrigationEventsTimeline() {
    // Função para obter dados de irrigação do banco de dados
    return await models.IrrigationLogs.findAll();
}

function calcularProximaIrrigacaoComRegressao(eventos) {
    const irrigacaoEventos = eventos.filter(evento => evento.action.includes("irrigada"));

    if (irrigacaoEventos.length < 2) {
        throw new Error("Não há eventos de irrigação suficientes para realizar a projeção.");
    }

    // Ordena os eventos por data
    irrigacaoEventos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // Converte as datas para timestamps e calcula os intervalos entre eventos
    const timestamps = irrigacaoEventos.map(evento => new Date(evento.createdAt).getTime());
    const intervalos = [];
    for (let i = 1; i < timestamps.length; i++) {
        intervalos.push(timestamps[i] - timestamps[i - 1]);
    }

    // Prepara os dados para regressão
    const x = intervalos.map((intervalo, index) => index);
    const y = intervalos;

    // Treina o modelo de regressão linear
    const regression = new SimpleLinearRegression(x, y);

    // Projeta os próximos eventos de irrigação para os próximos 3 meses
    const proximaData = [];
    let ultimoEvento = new Date(irrigacaoEventos[irrigacaoEventos.length - 1].createdAt);
    const tresMeses = 3 * 30 * 24 * 60 * 60 * 1000; // Três meses em milissegundos
    const dataLimite = ultimoEvento.getTime() + tresMeses;

    while (ultimoEvento.getTime() < dataLimite) {
        const proximoIntervalo = regression.predict(proximaData.length);
        ultimoEvento = new Date(ultimoEvento.getTime() + proximoIntervalo);
        proximaData.push(ultimoEvento);
    }

    return proximaData;
}

export default async function irrigationProjection(req, res) {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const eventos = await getIrrigationEventsTimeline();

            if (!eventos || eventos.length === 0) {
                throw new Error("Não encontramos nenhum evento de irrigação.");
            }

            const projection = calcularProximaIrrigacaoComRegressao(eventos);

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
