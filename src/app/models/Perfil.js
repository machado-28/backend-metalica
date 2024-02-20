/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";

class Perfil extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
        descricao: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
  static associate(models) {
    this.hasMany(models.Utilizador, {
      as: "utilizador",
      foreignKey: "id",
    });
  }
}
export default Perfil;
