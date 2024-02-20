/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";
import Usuario from "./Usuario";

class Funcionario extends Model {
  static init(sequelize) {
    super.init(
      {
        codigo: Sequelize.STRING,
        iban: Sequelize.STRING,
        numeroContaBancaria: Sequelize.STRING,
      },
      { sequelize }
    );
    this.addHook("beforeSave", async (funcionario) => {
      const usuario = await Usuario.findOne({ where: funcionario.id })

      funcionario.codigo = await usuario.nome[0] + (Math.random() * 10) / 9000
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "usuarioId",
    });
    this.belongsTo(models.Cargo, {
      as: "cargo",
      foreignKey: "cargoId",
    });
    this.belongsTo(models.Salario, {
      as: "salario",
      foreignKey: "salarioId",
    });
  }
}
export default Funcionario;
