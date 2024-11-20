'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ErrorLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      error: {
        allowNull: false,
        type: Sequelize.STRING
      },
      action: {
        allowNull: false,
        type: Sequelize.STRING
      },
      plantId: {
        allowNull: true,
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
    await queryInterface.dropTable('ErrorLogs');
  }
};