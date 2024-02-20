const { DataTypes } = require("sequelize");

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("funcionario", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      usuarioId: {
        type: DataTypes.INTEGER({ unsigned: true, }),
        allowNull: false,
        refences: { model: "usuario", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      codigo: {
        type: DataTypes.STRING({ length: 20 }),
        allowNull: false
      },
      iban: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      numeroContaBancaria: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      cargoId: {
        type: DataTypes.INTEGER({ unsigned: true, }),
        allowNull: false,
        refences: { model: "cargo", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      salarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refences: { model: "salario", key: "id" },
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
    await queryInterface.dropTable("funcionario");
  },
};
