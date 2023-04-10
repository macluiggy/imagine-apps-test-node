import dotenv from "dotenv";
dotenv.config();
const { schema, user, pass, host } = process.env;
export default {
  development: {
    username: user,
    password: pass,
    database: schema,
    host: host,
    dialect: "postgres",
    port: 5432,
  },
  // Use a different storage. Default: none
  // seederStorage: "sequelize",
};
