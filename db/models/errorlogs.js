'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ErrorLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ErrorLogs.init({
    error: DataTypes.STRING,
    action: DataTypes.STRING,
    plantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ErrorLogs',
    paranoid: true,
  });
  return ErrorLogs;
};