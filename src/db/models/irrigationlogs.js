'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class IrrigationLogs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    IrrigationLogs.init({
        action: DataTypes.STRING,
        plantId: DataTypes.INTEGER,
        climateTemperature: DataTypes.INTEGER,
        soilHumidity: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'IrrigationLogs',
    });
    return IrrigationLogs;
};