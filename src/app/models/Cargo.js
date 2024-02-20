/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";

class Cargo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
  static associate(models) {
    this.hasMany(models.Funcionario, {
      as: "funcionarios",
      foreignKey: "id",
    });
  }
}
export default Cargo;
