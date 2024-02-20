/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";

class TipoContacto extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
  static associate(models) {
    this.hasMany(models.Contacto, {
      as: "contacto",
      foreignKey: "id",
    });
  }
}
export default TipoContacto;
