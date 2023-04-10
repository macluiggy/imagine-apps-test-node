// import { create, getAll } from "../controllers/cedula.controller";
import { Router } from "express";

// controllers
import { get } from "../controllers/properties.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.get("/properties", verifyToken, get);

export default router;
