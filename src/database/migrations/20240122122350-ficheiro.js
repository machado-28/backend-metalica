const { DataTypes } = require("sequelize");

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ficheiro", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      dataEmissao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dataExpiracao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      pedidoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refences: { model: "pedido", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      tipoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refences: { model: "tipoFicheiro", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("ficheiro");
  },
};
