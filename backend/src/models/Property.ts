import Sequelize from "sequelize";
import { sequelize } from "../db";

const Property = sequelize.define(
  "property",
  {
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DECIMAL,
    },
    description: {
      type: Sequelize.TEXT,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Property;
