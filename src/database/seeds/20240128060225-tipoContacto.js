'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('tipoContacto', [{
      nome: 'telefone',
    },
    {
      nome: 'email',
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipoContacto', null, {});

  }
};
