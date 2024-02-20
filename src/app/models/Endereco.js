/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";

class Endereco extends Model {
  static init(sequelize) {
    super.init(
      {
        rua: Sequelize.STRING,
        casaNum: Sequelize.STRING,
        apartamentoNum: Sequelize.STRING,
        bairro: Sequelize.STRING,
        municipio: Sequelize.STRING,
        provinciaId: Sequelize.NUMBER,
      },
      { sequelize }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Usuario, {
      as: "morador",
      foreignKey: "moradorId",
    });
  }
}
export default Endereco;
