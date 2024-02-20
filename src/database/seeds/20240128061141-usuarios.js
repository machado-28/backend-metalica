'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuario', [
      {
        nome: 'Metalica',
        nif: '0056565656565',
        estadoCivil: 'solteira',
        isAdmin: true,
      }, {
        nome: 'Celina Tomás',
        nif: '0056565656565',
        estadoCivil: 'solteira',
        isAdmin: false,
      },
      {
        nome: 'Bibiana Ulundo',
        nif: '00565656565GH',
        estadoCivil: 'solteira',
        isAdmin: false,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuario', null, {});

  }
};
