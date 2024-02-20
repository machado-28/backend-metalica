import Documento from "../../models/Documento";
import ValidarDocumento from "../../utils/ValidarDocumento";
import ValidarUtilizador from "../../utils/ValidarUtilizador";
import fs from "fs";
import path from "path";

class UploadDocumentoController {
  async delete(req, res) {
    const { id } = req.params;

    const documentValido = await ValidarDocumento.id(id);

    if (!documentValido) {
      return res.status(404).json({ erro: "documento invalido!", status: 404 });
    }

    const { path: src } = await Documento.findOne({ where: { id } });

    await Documento.destroy({ where: { id } });
    console.log(src);
    fs.unlinkSync(
      path.resolve(__dirname, "..", "..", "..", "..", "temp", "upload/", src)
    );
    return res
      .status(200)
      .json({ mensagem: " arquivo deletado com sucesso!", status: 200 });
  }

  async store(req, res) {
    try {
      const { id_tipo } = req.params;
      const { originalname: name, filename: path } = req.file;
      console.log(req.file);

      const documento = await Documento.create({
        name,
        path,
        id_tipo,
      });
      return res
        .status(201)
        .json({
          documento,
          mensagem: "Upload realizado com sucesso!",
          status: 201,
        });
    } catch (erro) {
      console.log(erro);
      return res
        .status(500)
        .json({ erro: "erro nos arquivos", descricao: erro, status: 500 });
    }
  }

  async stores(req, res) {
    try {
      const { id_tipo } = req.params;
      const { originalname: name, filename: path } = req.file;
      console.log(req.file);

      const documento = await Documento.create({
        name,
        path,
        id_tipo,
      });

      return res
        .status(201)
        .json({
          documento,
          mensagem: "Upload realizado com sucesso!",
          status: 201,
        });
    } catch (erro) {
      console.log(erro);
      return res
        .status(500)
        .json({ erro: "erro nos arquivos", descricao: erro, status: 500 });
    }
  }
}
export default new UploadDocumentoController();
