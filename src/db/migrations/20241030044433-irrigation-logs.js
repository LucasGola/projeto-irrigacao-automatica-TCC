'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('IrrigationLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      action: {
        allowNull: false,
        type: Sequelize.STRING
      },
      plantId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      climateTemperature: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      soilHumidity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('IrrigationLogs');
  }
};
