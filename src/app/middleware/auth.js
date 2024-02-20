/* eslint-disable camelcase */
/* eslint-disable no-unreachable */
import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ erro: "você precisa iniciar sessão!", status: 1234 });
  }
  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      authConfig.secret || "CONDUCAO"
    );
    const {
      id,
      painel,
      nome,
      email,
      perfil,
      isAdmim, } =
      decoded;

    req.sessao = {
      id,
      nome,
      email,
      painel,
      isAdmim,
      perfil
    };
    return next();
  } catch (error) {
    return res.status(401).json({ error, authHeader });
  }
  return next();
};
