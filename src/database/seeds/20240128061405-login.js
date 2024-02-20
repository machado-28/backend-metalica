'use strict';
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('login', [{
      usuario: 'administrador@22',
      senha_hash: await bcrypt.hash("metalica1", 8),
      proprietarioId: 1,
      painel: 1,
    },
    {
      usuario: 'secretaria@22',
      senha_hash: await bcrypt.hash("metalica2", 8),
      proprietarioId: 2,
      painel: 2,
    },
    {
      usuario: 'rh@22',
      senha_hash: await bcrypt.hash("metalica3", 8),
      proprietarioId: 3,
      painel: 3,
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('login', null, {});

  }
};
