import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const { user, host, schema, pass } = process.env;
const URI = `postgresql://${user}:${pass}@${host}/${schema}`;
// const URI = process.env.URI!

export const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  logging: false,
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectToDB;
