class UploadController {
  async store(req, res) {
    try {
      const {} = req.file;

      const arquivo = await Ficheiro.findOne({
        where: {
          nome_original,
          pathname,
        },
      });

      return res.status(200).json(req.file);
    } catch (erro) {
      console.log(erro);
      return res
        .status(500)
        .json({ erro: `Ocorreu um erro inesperado no servidor.`, status: 500 });
    }
  }
}

export default new UploadController();
