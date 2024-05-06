'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActionLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActionLogs.init({
    action: DataTypes.STRING,
    beforeChanges: DataTypes.STRING,
    afterChanges: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ActionLogs',
  });
  return ActionLogs;
};