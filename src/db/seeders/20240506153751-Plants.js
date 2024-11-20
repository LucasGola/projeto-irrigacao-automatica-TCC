'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('plants', [{
      userId: 1,
      name: "Samambaia",
      type: "Samambaia",
      idealWaterPercent: 60,
      minWaterPercent: 40,
      maxTemperatureClimate: 24,
      minTemperatureClimate: 18,
      isActive: true,
      irrigationFrequency: 24,
    }, {
      userId: 1,
      name: "Cacto",
      type: "Cacto",
      idealWaterPercent: 15,
      minWaterPercent: 0,
      maxTemperatureClimate: 30,
      minTemperatureClimate: 20,
      isActive: false,
      irrigationFrequency: 72,
    }, {
      userId: 1,
      name: "Espada-De-São-Jorge",
      type: "Espada-De-São-Jorge",
      idealWaterPercent: 25,
      minWaterPercent: 10,
      maxTemperatureClimate: 30,
      minTemperatureClimate: 15,
      isActive: false,
      irrigationFrequency: 72,
    }, {
      userId: 1,
      name: "Dinheiro-Em-Penca",
      type: "Dinheiro-Em-Penca",
      idealWaterPercent: 25,
      minWaterPercent: 10,
      maxTemperatureClimate: 30,
      minTemperatureClimate: 15,
      isActive: false,
      irrigationFrequency: 48,
    }, {
      userId: 1,
      name: "Clorofito",
      type: "Clorofito",
      idealWaterPercent: 60,
      minWaterPercent: 40,
      maxTemperatureClimate: 27,
      minTemperatureClimate: 16,
      isActive: false,
      irrigationFrequency: 72,
    }, {
      userId: 1,
      name: "Girassol",
      type: "Girassol",
      idealWaterPercent: 60,
      minWaterPercent: 40,
      maxTemperatureClimate: 28,
      minTemperatureClimate: 24,
      isActive: false,
      irrigationFrequency: 24,
    }, {
      userId: 1,
      name: "Mammillaria Bocasana",
      type: "Cacto",
      idealWaterPercent: 50,
      minWaterPercent: 5,
      maxTemperatureClimate: 28,
      minTemperatureClimate: 20,
      isActive: false,
      irrigationFrequency: 0.00001,
    },
    ], {});
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
