'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plants.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    idealWaterPercent: DataTypes.INTEGER,
    minWaterPercent: DataTypes.INTEGER,
    maxWaterPercent: DataTypes.INTEGER,
    idealWeather: DataTypes.STRING,
    idealTemperatureWeather: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Plants',
  });
  return Plants;
};