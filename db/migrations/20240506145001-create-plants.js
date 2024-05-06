'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      idealWaterPercent: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      minWaterPercent: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      maxWaterPercent: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      idealWeather: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      idealTemperatureWeather: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plants');
  }
};