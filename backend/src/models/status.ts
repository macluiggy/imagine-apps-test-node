import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const Status: any = sequelize.define(
  "status",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    label: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "status",
  }
);

export default Status;
