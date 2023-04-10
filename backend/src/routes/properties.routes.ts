// import { create, getAll } from "../controllers/cedula.controller";
import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import Cliente from "../models/Clientes";

const router = Router();

router.get("/cliente", verifyToken, async (req, res) => {
  try {
    // creamos el cliente
    // const { ncedula, nombre, apellido, id_departamento } = req.body;
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

export default router;
