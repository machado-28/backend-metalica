const { DataTypes } = require("sequelize");

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pedido", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      solicitanteId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      legalizado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      cancelado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canceladoEm: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      legalizadoEm: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      aprovado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      aprovadoEm: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pedido");
  },
};
