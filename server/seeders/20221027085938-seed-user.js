'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@hamparanstone.com',
        password: hashPassword("password"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user@hamparanstone.com',
        password: hashPassword("password"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
