'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Airports', {
      fields: ['cityId'],
      type: 'foreign key',
      name: 'cityIdfk_constraint',
      references: { //Required field
        table: 'Cities',
        field: 'id'
      },
      onDelete: 'cascade',
     // onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports','cityIdfk_constraint');
  }
};
