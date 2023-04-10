import { Router } from "express";
import { validate, ValidationError, Joi } from "express-validation";
import Usuarios from "../models/Usuarios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

export default function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No se ha proporcionado un token",
    });
  }
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
