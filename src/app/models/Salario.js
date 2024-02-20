/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { Model, NUMBER } from "sequelize";
import "dotenv/config";

class Salario extends Model {
  static init(sequelize) {
    super.init(
      {
        valor: Sequelize.STRING,
        horaDeTrabalhoPorDia: Sequelize.INTEGER,
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.hasOne(models.Funcionario, {
      foreignKey: "id",
      as: "funcionarios",
    }); F
  }
}
export default Salario;
