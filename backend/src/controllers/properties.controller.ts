import { Request, Response, Router } from "express";
// import Status from "../models/Status";
import { sequelize } from "../db";
import { Op } from "sequelize";
import { property, status, status_history } from "../models/init-models";

const get = async (req: Request, res: Response) => {
  try {
    let { address, city, year } =
      Object.keys(req.query).length > 0 ? req.query : req.body;
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

    const _prop = await property.findAll({
      attributes: ["address", "city", "price", "description", "id"],
      raw: true,
      where: {
        ...filtros,
      },
      include: [
        {
          model: status_history,
          attributes: ["property_id", "status_id"],
          order: [["update_date", "DESC"]],
          limit: 1,
          include: [
            {
              model: status,
            },
          ],
        },
      ],
    });
    const prop = _prop.map((prop: any) => {
      const { address, city, price, description, id } = prop;
      return {
        address,
        city,
        price,
        description,
      };
    });
    return res.status(200).json({
      message: "Se obtuvieron las propiedades",
      // data: { property, status, status_id },
      data: prop,
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
