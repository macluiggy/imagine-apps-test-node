import { Request, Response, Router } from "express";
import Property from "../models/Property";
import Status from "../models/Status";
import { sequelize } from "../db";

const get = async (req: Request, res: Response) => {
  try {
    const status = await Status.findAll();
    const status_id = status.map((item) => item.id);
    const filtros = {};
    

    const property = await Property.findAll({
      where: {},
    });
    return res.status(200).json({
      message: "Se obtuvieron las propiedades",
      data: { property, status, status_id },
    });
  } catch (error: any) {
    console.log(error);

    res.status(404).json({
      error: error.message,
      data: [],
    });
  }
};

export { get };
