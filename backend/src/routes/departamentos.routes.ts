// import { create, getAll } from "../controllers/cedula.controller";
import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import Departamentos from "../models/Departamentos";

const router = Router();

router.post("/departamentos", verifyToken, async (req, res) => {
  try {
    // creamos el cliente
    const { nombre, id_cliente } = req.body;
    const departamento = await Departamentos.create({
      nombre,
      id_cliente,
    });
    return res.json({
      message: "Departamento creado",
      data: departamento,
    });
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
    });
  }
});

router.get("/departamentos", verifyToken, async (req, res) => {
  try {
    const departamentos = await Departamentos.findAll();
    return res.json({
      message: "Departamentos obtenidos",
      data: departamentos,
    });
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
    });
  }
});

router.get("/departamentos/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const departamento = await Departamentos.findByPk(id);
    return res.json({
      message: "Departamento obtenido",
      data: departamento,
    });
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
    });
  }
});

router.put("/departamentos/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, id_cliente } = req.body;
    const departamento = await Departamentos.update(
      {
        nombre,
        id_cliente,
      },
      {
        where: {
          id,
        },
      }
    );
    let departamentoActualizado = await Departamentos.findByPk(id);
    return res.json({
      message: "Departamento actualizado",
      data: departamentoActualizado,
    });
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
    });
  }
});

router.delete("/departamentos/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const departamento = await Departamentos.destroy({
      where: {
        id,
      },
    });
    if (!departamento)
      return res.status(404).json({
        message: "Departamento no encontrado",
      });
    return res.json({
      message: "Departamento eliminado",
      data: departamento,
    });
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
    });
  }
});

export default router;
