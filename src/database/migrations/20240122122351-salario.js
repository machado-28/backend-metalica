const { DataTypes } = require("sequelize");

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("salario", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      horaDeTrabalhoPorDia: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cargoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        refences: { model: "cargo", key: "id" },
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
    await queryInterface.dropTable("salario");
  },
};
