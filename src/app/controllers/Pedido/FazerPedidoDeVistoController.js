import Contacto from "../../models/Contacto";
import ValidarContacto from "../../utils/ValidarContacto";
import ValidarUsuario from "../../utils/ValidarUsuario";
import * as yup from "yup";
class FazerPedidoDeVistoController {
  async store(req, res) {
    try {
      const schema = yup.object().shape({
        email: yup.string().required(),
        nome: yup.string().required(),
        nome: yup.string().required(),
        nome: yup.string().required(),
      });

      let inputValidation = true;
      await schema.validate(req.body).catch((err) => {
        console.log(req.body);
        inputValidation = false;
        return res.status(400).json(err.errors);
      });

      if (!inputValidation) {
        return res.status(400).end();
      }
      const existe = true;
      const {
        nome,
        dataNascimento,
        email,
        telefone,
        genero,
        estadoCivil,
        nif,
      } = req.body;

      const usuario = await ValidarUsuario(nif);
      if (usuario === existe) {
        return res.status(401).json({ error: "usuario já cadastrado!" });
      }
      const validarEmail = await ValidarContacto(email);

      if (validarEmail === existe) {
        return res.status(401).json({ error: "email já utilizado!" });
      }

      const validarTelefone = await ValidarContacto(telefone);

      if (validarTelefone === existe) {
        return res.status(401).json({ error: "telefone já utilizado!" });
      }

      return res.status(200).json({});
    } catch (erro) {
      console.log(erro);
      return res
        .status(500)
        .json({ erro: `Ocorreu um erro inesperado no servidor.`, status: 500 });
    }
  }
}

export default new FazerPedidoDeVistoController();
