// import { create, getAll } from "../controllers/cedula.controller";
import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import Property from "models/Property";

const router = Router();

router.get("/property", async (req, res) => {
  try {
    // creamos el cliente
    // const { ncedula, nombre, apellido, id_departamento } = req.body;
    const property = await Property.findAll();
    return res.json({
      message: "Cliente creado",
      data: property,
    });
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
    });
  }
});

export default router;
