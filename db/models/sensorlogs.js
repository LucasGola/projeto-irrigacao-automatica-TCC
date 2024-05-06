'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SensorLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SensorLogs.init({
    sensor: DataTypes.STRING,
    measurement: DataTypes.STRING,
    plantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SensorLogs',
  });
  return SensorLogs;
};