import _ from 'lodash';
import models from '../../db/models';
import { createErrorLog, createActionLog } from '../createLogs';

const registerMeasurement = async (req, res) => {
    const {
        plantId, dht11Humidity, dht11Temperature,
        hygrometer, waterFlow } = req.body;

    try {
        if (_.isNil(plantId) || _.isNil(dht11Humidity) || _.isNil(dht11Temperature) ||
            _.isNil(hygrometer) || _.isNil(waterFlow)) throw new Error("Todos os dados são necessários.")

        await models.sequelize.transaction(async (transaction) => {
            const dht11HumidityData = await models.SensorLogs.create({
                sensor: "DHT11 - Humidade",
                measurement: dht11Humidity,         // Porcentagem
                plantId,
            }, {
                transaction,
            });

            const dht11TemperatureData = await models.SensorLogs.create({
                sensor: "DHT11 - Temperatura",
                measurement: dht11Temperature,      // Graus Celcius
                plantId,
            }, {
                transaction,
            });

            const hygrometerData = await models.SensorLogs.create({
                sensor: "Higrômetro",
                measurement: hygrometer,            // Porcentagem
                plantId,
            }, {
                transaction,
            });

            const waterFlowData = await models.SensorLogs.create({
                sensor: "Vazão D'Água",
                measurement: waterFlow,             // Litros
                plantId,
            }, {
                transaction,
            });

            if (_.isNil(dht11HumidityData) || _.isNil(dht11TemperatureData) ||
                _.isNil(hygrometerData) || _.isNil(waterFlowData)) throw new Error("Não foi possível registrar os dados dos sensores.")

            await createActionLog("Dados dos sensores registrados.", null, null, plantId)
            return res.status(200).json({
                message: "Dados dos sensores registrados com sucesso!",
                data: {
                    dht11HumidityData,
                    dht11TemperatureData,
                    hygrometerData,
                    waterFlowData,
                }
            })
        });
    } catch (err) {
        await createErrorLog(err.stack, "Registro de dados dos sensores", plantId)
        return res.status(500).json({
            message: "Houve um erro ao registrar os dados dos sensores.",
            error: err.message
        })
    }
};


export default registerMeasurement