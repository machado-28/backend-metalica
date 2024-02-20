import Documento from "../../models/Documento";
import ValidarDocumento from "../../utils/ValidarDocumento";
import ValidarUtilizador from "../../utils/ValidarUtilizador";

class UploadAvatarController {
  async executar(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;
      console.log(req.avatar);

      const avatar = await Documento.create({
        name,
        path,
        id_tipo: 5,
      });
      return res.status(201).json({
        mensagem: "Upload realizado com sucesso!",
        status: 201,
        avatar: avatar,
      });
    } catch (erro) {
      console.log(erro);
      return res
        .status(500)
        .json({
          erro: "Erro ao realizar esta operacao",
          descricao: erro,
          status: 500,
        });
    }
  }
}
export default new UploadAvatarController();
