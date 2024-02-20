/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";

class Categoria extends Model {
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
}
export default Categoria;
