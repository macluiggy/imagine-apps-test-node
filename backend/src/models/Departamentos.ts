import Sequelize from "sequelize";
import { sequelize } from "../db";

const Departamentos = sequelize.define(
  "departamentos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.TEXT,
    },
    id_cliente: {
      type: Sequelize.INTEGER,
    }
  },
  {
    timestamps: false,
  }
);

export default Departamentos;
