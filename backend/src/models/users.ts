import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const users: any = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

export default users;
