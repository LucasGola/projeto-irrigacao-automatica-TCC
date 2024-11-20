'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SensorLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sensor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      measurement: {
        allowNull: false,
        type: Sequelize.STRING
      },
      plantId: {
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
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SensorLogs');
  }
};