'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ActionLogs', {
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
      beforeChanges: {
        allowNull: true,
        type: Sequelize.STRING
      },
      afterChanges: {
        allowNull: true,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ActionLogs');
  }
};