import { Router } from "express";
import { validate, ValidationError, Joi } from "express-validation";
import { users } from "../models/init-models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

const registerValidation = {
  body: Joi.object({
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    username: Joi.string().required(),
  }),
};

const loginValidation = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};

type User = {
  id: number;
  nombre: string;
  username: string;
  email: string;
  password: string;
};
router.post("/login", validate(loginValidation, {}, {}), async (req, res) => {
  try {
    // buscar el usuario en la base de datos usango orm sequelize
    const { username, password } = req.body;
    const user: any = await users.findOne({
      attributes: ["id", "username", "password"],
      where: {
        username,
      },
    });
    // return res.json(user)
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    // verificamos que la contraseña sea correcta
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new Error("Contraseña incorrecta");
    }
    // crear el token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });
    res.json({
      user,
      token,
    });
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
    });
  }
});

router.post(
  "/signup",
  validate(registerValidation, {}, {}),
  async (req, res) => {
    try {
      // crear el usuario en la base de datos usango orm sequelize
      const { password, nombre, username } = req.body;
      // verificamos que no exista el usuario
      const userFound = await users.findAll({
        attributes: ["id", "username"],
        where: {
          username,
        },
      });
      if (userFound.length > 0) {
        throw new Error("Usuario ya existe");
      }
      const encryptedPassword = bcrypt.hashSync(password, 10);
      const user = await users.create({
        password: encryptedPassword,
        nombre,
        username,
      });
      res.json({
        message: "Usuario creado",
        user,
      });
    } catch (error: any) {
      console.log("error");
      res.status(404).json({
        error: error.message,
      });
    }
  }
);

export default router;
