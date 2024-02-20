const { DataTypes } = require("sequelize");

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("falta", {
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
        onDelete: "CASADE",
        onUpdate: "CASCADE",
      },
      justificadoEm: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      justificado: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("falta");
  },
};
