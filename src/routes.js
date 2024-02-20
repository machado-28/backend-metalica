import { Router } from "express";
import 'dotenv/config'
import permissaoAcesso from "./app/middleware/permissaoAcesso";
import verificarSessao from "./app/middleware/auth";
import TerminarSessaoController from './app/controllers/TerminarSessaoController'
import multerConfig from "./config/multer";
import multer from "multer";
import FazerPedidoDeVistoController from "./app/controllers/Pedido/FazerPedidoDeVistoController";
import UploadController from "./app/controllers/UploadController";
import IniciarSessaoController from "./app/controllers/IniciarSessaoController";
import FuncionarioController from "./app/controllers/Funcionario/FuncionarioController";
import FaltaController from "./app/controllers/Funcionario/FaltaController";

const upload = multer(multerConfig);
const routes = new Router();

routes.get("/api/v1", async (req, res) => {
  return;
});

routes.post("/api/v1/logout", TerminarSessaoController.executar)
routes.post("/api/v1/login", IniciarSessaoController.executar)
routes.post("/api/v1/pedidos", FazerPedidoDeVistoController.store);
routes.post("/api/v1/upload", upload.single("anexo"), UploadController.store);
routes.post("/api/v1/funcionarios", FuncionarioController.store);
routes.get("/api/v1/funcionarios", FuncionarioController.index);
routes.post("/api/v1/funcionarios/faltas/:id", FaltaController.store);
routes.get("/api/v1/funcionarios/faltas/:id", FaltaController.index);
routes.get("/api/v1/funcionarios/:id", FuncionarioController.getOne);
routes.delete("/api/v1/funcionarios/:id", FuncionarioController.delete);
routes.use(verificarSessao);

export default routes;
