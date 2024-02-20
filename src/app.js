import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path";
import 'express-async-errors';
import routes from "./routes";
import "./database";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionError()
  }

  middlewares() {

    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: "*",
        allowedHeaders: "*",
        exposedHeaders: [],
        methods: ["GET", "POST", "PUT", "DELETE"],
      },)
    );
    this.server.use("/documentos",
      express.static(path.resolve(__dirname, "..", "temp", "upload")),)

  }

  routes() {
    this.server.use(routes);

  }
  exceptionError() {
    this.server.use(async (err, req, res, next) => {
      return res.status(500).json(err)
    })
  }
}
export default new App().server;
