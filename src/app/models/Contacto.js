/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";

class Contacto extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Usuario, {
      as: "proprietario",
      foreignKey: "proprietarioId",
    });
    this.belongsTo(models.TipoContacto, {
      as: "tipo",
      foreignKey: "tipoId",
    });
  }
}
export default Contacto;
