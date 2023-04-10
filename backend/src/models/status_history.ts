import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const StatusHistory: any = sequelize.define(
  "status_history",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
    },
    update_date: {
      type: DataTypes.DATE,
    },
    status_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: "status_history",
  }
);

export default StatusHistory;
