// import { create, getAll } from "../controllers/cedula.controller";
import { Router } from "express";
import { validate, ValidationError, Joi } from "express-validation";
import Usuarios from "../models/Usuarios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verifyToken";
import Cliente from "../models/Clientes";

const router = Router();

router.post("/cliente", verifyToken, async (req, res) => {
  try {
    // creamos el cliente
    const { ncedula, nombre, apellido, id_departamento } = req.body;
    const cliente = await Cliente.create({
      ncedula,
      nombre,
      apellido,
      id_departamento,
    })
    return res.json({
      message: "Cliente creado",
      data: cliente
    })
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
    });
  }
});

router.get("/cliente", verifyToken, async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    return res.json({
      data: clientes,
    });
  } catch (error: any) {
    console.log(error);
    
    res.status(404).json({
      error: error.message,
    });
  }
});

router.get("/cliente/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findOne({
      where: {
        id,
      },
    });
    return res.json({
      data: cliente,
    });
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
    });
  }
})

router.put("/cliente/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { ncedula, nombre, apellido, id_departamento } = req.body;
    const cliente = await Cliente.findOne({
      where: {
        id,
      },
    });
    if (cliente) {
      await cliente.update({
        ncedula,
        nombre,
        apellido,
        id_departamento,
      });
      return res.json({
        message: "Cliente actualizado",
        data: cliente,
      });
    }
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
    });
    
  }
})

router.delete("/cliente/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findOne({
      where: {
        id,
      },
    });
    if (cliente) {
      await cliente.destroy();
      return res.json({
        message: "Cliente eliminado",
        data: cliente,
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      error: error.message,
    });
  }
})


export default router;
