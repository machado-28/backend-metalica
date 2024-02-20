'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('cargo', [
      {
        nome: 'secretaria',
      },
      {
        nome: 'administrador',
      },
      {
        nome: 'recurso humano',
      },
      {
        nome: 'SME',
      },
      {
        nome: 'Ss7',
      },
      {
        nome: 'S7',
      },
      {
        nome: 'Mirempet',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cargo', null, {});

  }
};
