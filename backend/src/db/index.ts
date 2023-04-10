import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const { user, host, schema, pass } = process.env;
// const URI = `postgresql://${user}:${pass}@${host}/${schema}`;
const URI = process.env.URI!
console.log(URI);

export const sequelize = new Sequelize(URI, {
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });
