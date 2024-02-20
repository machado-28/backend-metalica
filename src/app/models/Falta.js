/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";

class Falta extends Model {
  static init(sequelize) {
    super.init(
      {
        justificado: Sequelize.BOOLEAN,
        justificadoEm: Sequelize.DATE
      },
      { sequelize }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Funcionario, {
      as: "funcionario",
      foreignKey: "funcionarioId",
    });
  }
  justificar() {
    return this.justificado = true;
  }
}
export default Falta;
