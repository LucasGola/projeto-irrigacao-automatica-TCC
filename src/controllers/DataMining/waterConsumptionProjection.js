import models from '../../db/models';
import * as tf from '@tensorflow/tfjs';
import { Op } from 'sequelize';
import { createErrorLog, createActionLog } from '../createLogs'; // Adicionando os imports

async function trainNeuralNetwork(data, windowSize) {
    // Normaliza os dados
    const measurements = data.map(entry => parseFloat(entry.measurement));
    const maxMeasurement = Math.max(...measurements);
    const minMeasurement = Math.min(...measurements);
    const normalizedMeasurements = measurements.map(m => (m - minMeasurement) / (maxMeasurement - minMeasurement));

    // Cria as janelas deslizantes
    const xs = [];
    const ys = [];
    for (let i = 0; i < normalizedMeasurements.length - windowSize; i++) {
        xs.push(normalizedMeasurements.slice(i, i + windowSize));
        ys.push(normalizedMeasurements[i + windowSize]);
    }

    const xsTensor = tf.tensor2d(xs);
    const ysTensor = tf.tensor2d(ys, [ys.length, 1]);

    // Define o modelo
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 50, inputShape: [windowSize], activation: 'relu' })); // Primeira camada oculta com 50 neurônios
    model.add(tf.layers.dense({ units: 30, activation: 'relu' })); // Segunda camada oculta com 30 neurônios
    model.add(tf.layers.dense({ units: 15, activation: 'relu' })); // Terceira camada oculta com 15 neurônios
    model.add(tf.layers.dense({ units: 1 })); // Camada de saída

    // Compila o modelo
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

    // Treina o modelo
    await model.fit(xsTensor, ysTensor, { epochs: 500 }); // Aumentando o número de épocas para melhorar o treinamento

    return { model, minMeasurement, maxMeasurement, windowSize };
}

async function calculateWaterConsumptionWithNeuralNetwork(data) {
    if (data.length < 2) {
        throw new Error("Não há dados suficientes para realizar a projeção.");
    }

    // Treina a rede neural
    const windowSize = 7; // Tamanho da janela deslizante
    const { model, minMeasurement, maxMeasurement } = await trainNeuralNetwork(data, windowSize);

    // Usa a janela deslizante para projetar os próximos valores
    const measurements = data.map(entry => parseFloat(entry.measurement));
    const normalizedMeasurements = measurements.map(m => (m - minMeasurement) / (maxMeasurement - minMeasurement));

    const nextMeasurements = [];
    let window = normalizedMeasurements.slice(-windowSize);

    const threeMonths = 3 * 30; // Três meses em dias

    for (let i = 0; i < threeMonths; i++) {
        const nextMeasurement = model.predict(tf.tensor2d([window])).dataSync()[0];
        const denormalizedMeasurement = nextMeasurement * (maxMeasurement - minMeasurement) + minMeasurement;

        nextMeasurements.push(denormalizedMeasurement);
        window = [...window.slice(1), nextMeasurement];
    }

    return nextMeasurements;
}

export default async function waterConsumptionProjection(req, res) {
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

            if (!data || data.length === 0) {
                throw new Error("Não encontramos nenhum dado de consumo de água.");
            }

            const projection = await calculateWaterConsumptionWithNeuralNetwork(data);

            await createActionLog("Projeção de consumo de água", null, null, null);
            return res.status(200).json({
                message: "Projeção de consumo de água concluída!",
                projection
            });
        });

    } catch (err) {
        await createErrorLog(err.stack, "Projeção de consumo de água");
        return res.status(500).json({
            message: "Ocorreu um erro ao projetar o consumo de água",
            error: err.message
        });
    }
}
