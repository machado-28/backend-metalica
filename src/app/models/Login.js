/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";

class Login extends Model {
  static init(sequelize) {
    super.init(
      {
        usuario: Sequelize.STRING,
        senha_hash: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        painel: Sequelize.INTEGER
      },
      { sequelize }
    );
    this.addHook("beforeSave", async (usuario) => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Usuario, {
      as: "proprietario",
      foreignKey: "proprietarioId",
    });
  }
  validarSenha(senha) {
    return bcrypt.compareSync(senha, this.senha_hash);
  }
}
export default Login;
