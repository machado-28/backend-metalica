import Cargo from "../../models/Cargo";
import Contacto from "../../models/Contacto";
import Endereco from "../../models/Endereco";
import Funcionario from "../../models/Funcionario";
import Salario from "../../models/Salario";
import Falta from "../../models/Falta";
import { startOfHour, endOfHour, parseISO, startOfDay, endOfDay } from 'date-fns'
import ValidarContacto from "../../utils/ValidarContacto";
import ValidarUsuario from "../../utils/ValidarUsuario";
import * as yup from "yup";
import Usuario from "../../models/Usuario";
import { Op } from "sequelize";
class FaltaController {
    async store(req, res) {
        try {
            const existe = true;
            const { id: funcionarioId } = req.params;

            const funcioanario = await Funcionario.findOne({ where: { id: funcionarioId } })

            if (!funcioanario) {
                return res.status(404).json({ erro: "Funcionario não encontrado" })
            }

            async function VerificarFaltaNoDiaActual(funcionarioId, data = new Date()) {
                const inicioDoDia = startOfDay(data);
                const fimDoDia = endOfDay(data);

                try {
                    const totalFaltas = await Falta.count({
                        where: {
                            funcionarioId,
                            createdAt: {
                                [Op.between]: [inicioDoDia, fimDoDia]
                            }
                        }
                    });

                    console.log(`Total de faltas na ${data.toLocaleString("pt-PT", { dateStyle: "full" })}: ${totalFaltas}`);
                    return totalFaltas;
                } catch (error) {
                    console.error('Erro ao verificar faltas:', error);
                    return 0; // Retornar 0 em caso de erro
                }
            }

            const faltaJaMarcada = (await VerificarFaltaNoDiaActual(funcionarioId)) > 0 ? true : false
            console.log(faltaJaMarcada);
            if (faltaJaMarcada === true) return res.status(402).json({ erro: "Não é possível receber mais de uma falta em um único dia!" })

            const falta = await Falta.create({
                funcionarioId,
            })

            return res.status(201).json({ mensagem: "Falta registrada com sucesso!" });
        } catch (erro) {
            console.log(erro);
            return res
                .status(500)
                .json({
                    erro: `Ocorreu um erro inesperado ao registrar a
                     Falta \n Contacte o Administrador.`, status: 500
                });
        }
    }

    async index(req, res) {

        try {
            let { limit = 5, page = 1, mes = new Date().getMonth() } = req.query;
            let offset = (page - 1) * limit;
            const { id: funcionarioId } = req.params;

            offset = offset < 0 ? offset * -1 : offset;
            limit = limit < 0 ? limit * -1 : limit;

            const { count: total, rows: funcionarios } = await Falta.findAndCountAll({
                offset,
                limit,
                where: { funcionarioId, },
                attributes: ['id', "funcionarioId", "updatedAt", "createdAt", "justificado", "justificadoEm"],
                order: [["updatedAt", "DESC"]],
                include: [
                    {
                        model: Funcionario, as: "funcionario", include: [
                            {
                                model: Usuario, as: "usuario"
                            },
                            { model: Cargo, as: "cargo" },
                        ]
                    },
                ]
            })

            return res.status(200).json({ faltas, total })

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
    async justificar(req, res) {
        try {
            const { id } = req.params
            const falta = await Falta.findOne({ where: { id, justificado: Op.eq = true } });
            if (!falta) {
                return res.status(404).json({ mensagem: " parece que a falta já está justificada.", status: 404 })
            }
            await falta.update({ justificado: true })
            return res.status(200).json({ mensagem: "Jusificado COM SUCESSO!", status: 200 });

        } catch (erro) {
            console.log(erro);
            return res.status(500).json({ erro: "Desculpa! ocorreu um erro ao justificar falta. tente actualizar o navegador", status: 500 });

        }

    }

}

export default new FaltaController();
