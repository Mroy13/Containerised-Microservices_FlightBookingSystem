'use strict';
/** @type {import('sequelize-cli').Migration} */
const {ENUMS}=require('../utils/common');
const {ADMIN,USER,FLIGHT_COMPANY}=ENUMS.role_enums;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.ENUM,
        allowNull:false,
        values:[ADMIN,USER,FLIGHT_COMPANY],
        defaultValue:USER,  
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};