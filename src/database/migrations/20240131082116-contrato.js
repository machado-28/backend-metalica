const { DataTypes } = require("sequelize");

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contrato", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      funcionarioId: {
        type: DataTypes.INTEGER({ unsigned: true, }),
        allowNull: false,
        refences: { model: "funcionario", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      dataInicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      quantidadeRenovacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dataRenovacao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      expirado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      duracao: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("contrato");
  },
};
