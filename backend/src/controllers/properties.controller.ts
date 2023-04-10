import { Request, Response, Router } from "express";
import Property from "../models/Property";
import Status from "../models/Status";
import { sequelize } from "../db";
import { Op } from "sequelize";

const get = async (req: Request, res: Response) => {
  try {
    let { address, city, year } = req.query;
    const _year = parseInt(year as string);
    const status = await Status.findAll();
    const status_id = status.map((item) => item.id);
    const filtros: {
      status_id?: {
        [Op.in]: number[];
      };
      address?: {
        [Op.iLike]: string;
      };
      city?: {
        [Op.iLike]: string;
      };
      year?: number;
    } = {};
    if (status_id.length > 0) {
      filtros.status_id = {
        [Op.in]: status_id,
      };
    }
    if (address) {
      filtros.address = {
        [Op.iLike]: `%${address}%`,
      };
    }
    if (city) {
      filtros.city = {
        [Op.iLike]: `%${city}%`,
      };
    }
    if (year) {
      filtros.year = _year;
    }

    const property = await Property.findAll({
      where: {
        ...filtros,
      },
    });
    return res.status(200).json({
      message: "Se obtuvieron las propiedades",
      // data: { property, status, status_id },
      data: property,
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
