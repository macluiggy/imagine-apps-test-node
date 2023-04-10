import { Request, Response, Router } from "express";
// import Status from "../models/Status";
import { sequelize } from "../db";
import { Op } from "sequelize";
import { property, status, status_history } from "../models/init-models";

const get = async (req: Request, res: Response) => {
  try {
    let { address, city, year } = req.query;
    const _year = parseInt(year as string);
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

    const p = await property.findAll({
      attributes: ["address", "city", "price", "description"],
      where: {
        ...filtros,
      },
      include: [
        {
          model: status_history,
        },
      ],
    });
    return res.status(200).json({
      message: "Se obtuvieron las propiedades",
      // data: { property, status, status_id },
      data: p,
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
