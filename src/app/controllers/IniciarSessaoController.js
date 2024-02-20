import Login from "../models/Login";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import './../../config/yup'
import 'dotenv/config'
import authConfig from "../../config/auth";
import Usuario from "../models/Usuario";

class IniciarSessaoController {
  async executar(req, res) {

    const schema = yup.object().shape({
      usuario: yup.string().required(),
      senha: yup.string().required(),
    });
    try {
      let inputValidation = true;
      await schema.validate(req.body).catch((err) => {
        console.log(req.body);
        inputValidation = false;
        return res.status(400).json(err.errors);
      });

      if (!inputValidation) {
        return res.status(400).end();
      }

      const { usuario, senha } = req.body;
      console.log(senha);
      const usuarioValido = await Login.findOne({
        attributes: ['id', 'painel', 'senha_hash'],
        where: {
          usuario,
        }, include: [
          { model: Usuario, as: 'proprietario', attributes: ['id', 'nome', 'isAdmin'] }
        ]
      })

      if (!usuarioValido)
        return res.status(401).json({ erro: "usuario ou senha incorrecto" });


      if (!(await usuarioValido.validarSenha(senha))) {

        return res.status(401).json({ error: "usuario ou senha incorrecto!" });
      }
      console.log("SECRET", authConfig.secret);
      // 
      const { painel, proprietario: { id, nome, isAdmin }, nif, } = usuarioValido
      const token = jwt.sign({ id, painel, nome, nif, isAdmin, }, authConfig.secret, { expiresIn: authConfig.expiresIn })
      return res.status(200).json({ id, painel, nome, nif, isAdmin, token })
    } catch (erro) {
      console.log(erro);
      return res
        .status(500)
        .json({ erro, mensagem: "ocorreu um erro ao iniciar sessão" });
    }
  }
}

export default new IniciarSessaoController();
