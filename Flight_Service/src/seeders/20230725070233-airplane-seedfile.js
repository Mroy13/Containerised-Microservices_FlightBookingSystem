'use strict';
const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber: 'Boeing747400',
        capacity: 900,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'Boeing737',
        capacity: 700,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        modelNumber: 'AirbusA380',
        capacity: 500,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        modelNumber: 'Boeing777',
        capacity: 600,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        modelNumber: 'Boeing757',
        capacity: 750,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        modelNumber: 'Concorde',
        capacity: 800,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        modelNumber: 'AirbusA340',
        capacity: 900,
        createdAt: new Date(),
        updatedAt: new Date()

      },

    ]);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', {
      [Op.or]: [
        { modelNumber: 'Boeing 747-400' },
        { modelNumber: 'Boeing 737' },
        { modelNumber: 'Airbus A380' },
        { modelNumber: 'Boeing 777' },
        { modelNumber: 'Boeing 757' },
        { modelNumber: 'Concorde' },
        { modelNumber: 'Airbus A340' },

      ]
    });
  }
};
