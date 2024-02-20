/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { Model, NUMBER } from "sequelize";
import "dotenv/config";

class Ficheiro extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        pedidoId: sequelize.NUMBER,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/documentos/${this.path}`;
          },
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Utilizador, {
      foreignKey: "id_proprietario",
      as: "proprietario",
    });
    this.belongsTo(models.Tipo_documento, {
      foreignKey: "id_tipo",
      as: "tipo",
    });
  }
}
export default Ficheiro;
