import { Router } from "express";
import { validate, ValidationError, Joi } from "express-validation";
import { users } from "models/init-models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

export default function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message:
        "No se ha proporcionado un token, cree un usuario primero en /auth/signup o inicie sesión en /auth/login, luego use el token en el header de la petición 'req.headers.authorization'",
    });
    req.body.estaLogueado = false;
    next();
    return;
  }
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.body.estaLogueado = true;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
