import { DataTypes } from "sequelize";
import { sequelize } from "../db";
const { schema } = process.env;

const Property = sequelize.define(
  "property",
  {
    address: {
      type: DataTypes.STRING, // Aquí también se debe usar DataTypes
    },
    city: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    description: {
      type: DataTypes.TEXT,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
    tableName: "property",
  }
);

export default Property;
