import Cargo from "../../models/Cargo";
import Contacto from "../../models/Contacto";
import Endereco from "../../models/Endereco";
import Funcionario from "../../models/Funcionario";
import Salario from "../../models/Salario";
import Usuario from "../../models/Usuario";
import ValidarContacto from "../../utils/ValidarContacto";
import ValidarUsuario from "../../utils/ValidarUsuario";
import * as yup from "yup";
class FuncionarioController {
  async store(req, res) {
    try {
      const schema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().email().required(),
        telefone: yup.string().max(9).min(9).required(),
        dataNascimento: yup.date(),
        estadoCivil: yup.string().required(),
        salario: yup.number().required(),
        horaDeTrabalhoPorDia: yup.number().required(),
        iban: yup.string().required(),
        nif: yup.string().required(),
        numeroContaBancaria: yup.string(),
        cargoId: yup.number().required(),
        bairro: yup.string().required(),
        nacionalidadeId: yup.number(),
        municipio: yup.string().required(),
      });

      let inputValidation = true;
      await schema.validate(req.body).catch((err) => {
        console.log(req.body);
        inputValidation = false;
        const erro = err.errors[0]
        return res.status(400).json({ erro });
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
        salario,
        horaDeTrabalhoPorDia,
        iban,
        numeroContaBancaria,
        bairro,
        municipio,
        nacionalidadeId,
        cargoId,
      } = req.body;
      const nifValido = await ValidarUsuario(nif);

      if (nifValido === existe) {
        return res.status(401).json({ erro: "Funcionário já cadastrado!" });
      }
      const validarEmail = await ValidarContacto.match(email);

      if (validarEmail === existe) {
        return res.status(401).json({ erro: "email já utilizado!" });
      }
      const validarTelefone = await ValidarContacto.match(telefone);

      if (validarTelefone === existe) {
        return res.status(401).json({ erro: "telefone já utilizado!" });
      }
      const usuario = await Usuario.create({
        nome,
        nif,
        nacionalidadeId,
        genero,
        estadoCivil,
        dataNascimento
      })

      const contactos = await Contacto.bulkCreate([{
        descricao: telefone,
        proprietarioId: usuario.id,

      }, {
        descricao: email,
        proprietarioId: usuario.id
      }])

      const salarioActual = await Salario.findOrCreate({
        where: {
          valor: salario,
          horaDeTrabalhoPorDia
        }
      })

      const endereço = await Endereco.findOrCreate({
        where: {
          bairro, municipio,
          moradorId: usuario.id
        }
      })

      const { id: usuarioId } = usuario
      const { id: salarioId } = salarioActual[0]


      const novoFuncinario = await Funcionario.create({
        usuarioId,
        salarioId,
        cargoId,
        iban,
        numeroContaBancaria
      })

      return res.status(201).json({ novoFuncinario });
    } catch (erro) {
      console.log(erro);
      return res
        .status(500)
        .json({ erro: `Ocorreu um erro inesperado no servidor.`, status: 500 });
    }
  }

  async index(req, res) {

    try {
      let { limit = 5, page = 1 } = req.query;
      let offset = (page - 1) * limit;

      offset = offset < 0 ? offset * -1 : offset;
      limit = limit < 0 ? limit * -1 : limit;

      const { count, rows } = await Funcionario.findAndCountAll({
        offset,
        limit,
        attributes: ['id', "usuarioId", "updatedAt", "salarioId", "cargoId"],
        order: [["updatedAt", "DESC"]],
        include: [
          { model: Salario, as: "salario" },
          { model: Cargo, as: "cargo" },
          {
            model: Usuario,
            as: 'usuario',
            include: [{
              association: "endereco",
              as: 'endereco',
            }]

          }
        ]
      })

      return res.status(200).json({ funcionarios: rows, total: count })

    } catch (error) {
      console.log(error);
      return res.status(500).json({ erro: `Ocorreu um erro inesperado no servidor.`, status: 500 });

    }
  }
  async getOne(req, res) {
    try {

      const { id } = req.params

      const funcionario = await Funcionario.findOne({
        where: {
          id
        },
        attributes: ['id', "usuarioId", "updatedAt", "salarioId", "cargoId"],

        include: [
          { model: Salario, as: "salario" },
          { model: Cargo, as: "cargo" },
          {
            model: Usuario,
            as: 'usuario',
            include: [{
              association: "endereco",
              as: 'endereco',
            }]


          }
        ]
      })
      console.log("Funcionario Encontrado", funcionario);

      return res.status(200).json({ funcionario })
    } catch (error) {
      console.log("Erro da api", error)
      return res.status(500).json({ erro: error })
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params

      const funcioanario = await Funcionario.findOne({ where: { id } });
      if (!funcioanario) {
        return res.status(404).json({ mensagem: "funcionario nao encontrado", status: 404 })
      }
      const { usuarioId } = funcioanario;
      const usuario = await Usuario.findOne({ where: { id: usuarioId } });
      await funcioanario.destroy();
      await usuario.destroy();
      return res.status(200).json({ mensagem: "DELETADO COM SUCESSO!", status: 200 });

    } catch (erro) {

      console.log(erro);
      return res.status(500).json({ erro, status: 500 });

    }

  }

}

export default new FuncionarioController();
