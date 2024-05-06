'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('plants', [{
      userId: 1,
      name: "Mammillaria Bocasana",
      type: "Cacto",
      idealWaterPercent: 50,
      minWaterPercent: 5,
      maxWaterPercent: 80,
      idealWeather: "Clima quente com baixa umidade e luz (meia sombra)",
      idealTemperatureWeather: 23,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
