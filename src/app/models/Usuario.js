/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        dataNascimento: Sequelize.DATE,
        genero: Sequelize.STRING,
        estadoCivil: Sequelize.STRING,
        nif: Sequelize.STRING,
        isAdmin: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Endereco, {
      as: "endereco",
      key: "id"
    })
  }
}
export default Usuario;
