import _ from 'lodash';
import models from '../../db/models';
import { createErrorLog, createActionLog } from '../createLogs';
import getPlantInfo from "../Plants/getPlantInfo"

const registerMeasurement = async (req, res) => {
    const {
        dht11Humidity, dht11Temperature,
        hygrometer, waterFlow, batteryPercent } = req.body;

    console.log("\nResgistrando medições dos sensores!\n")

    try {
        if (_.isNil(dht11Humidity)) throw new Error("É necessário passar os dados de humidade do ar.");
        if (_.isNil(dht11Temperature)) throw new Error("É necessário passar os dados de temperatura do ar.");
        if (_.isNil(batteryPercent)) throw new Error("É necessário passar os dados da bateria.");
        if (_.isNil(hygrometer)) throw new Error("É necessário passar os dados de humidade do solo.");
        if (_.isNil(waterFlow)) throw new Error("É necessário passar os dados de vazão d'água.");

        const plant = await models.Plants.findOne({ where: { isActive: true, deletedAt: null } })

        await models.sequelize.transaction(async (transaction) => {
            const dht11HumidityData = await models.SensorLogs.create({
                sensor: "DHT11 - Humidade",
                measurement: dht11Humidity,         // Porcentagem
                plantId: plant.id,
            }, {
                transaction,
            });

            const dht11TemperatureData = await models.SensorLogs.create({
                sensor: "DHT11 - Temperatura",
                measurement: dht11Temperature,      // Graus Celcius
                plantId: plant.id,
            }, {
                transaction,
            });

            const hygrometerData = await models.SensorLogs.create({
                sensor: "Higrômetro",
                measurement: hygrometer,            // Porcentagem
                plantId: plant.id,
            }, {
                transaction,
            });

            const waterFlowData = await models.SensorLogs.create({
                sensor: "Vazão D'Água",
                measurement: waterFlow,             // Litros
                plantId: plant.id,
            }, {
                transaction,
            });

            const batteryPercentData = await models.SensorLogs.create({
                sensor: "Bateria",
                measurement: batteryPercent,        // Porcentagem
                plantId: plant.id,
            }, {
                transaction,
            });

            if (_.isNil(dht11HumidityData) || _.isNil(dht11TemperatureData) ||
                _.isNil(hygrometerData) || _.isNil(waterFlowData) || _.isNil(batteryPercentData)
            ) throw new Error("Não foi possível registrar os dados dos sensores.")

            await createActionLog("Dados dos sensores registrados.", null, null, plant.id)
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
        await createErrorLog(err.stack, "Registro de dados dos sensores", null)
        return res.status(500).json({
            message: "Houve um erro ao registrar os dados dos sensores.",
            error: err.message
        })
    }
};


export default registerMeasurement