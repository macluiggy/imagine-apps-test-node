"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var express = require("express");
var sequelize$1 = require("sequelize");
var dotenv = require("dotenv");
var cors = require("cors");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var express__default = /* @__PURE__ */ _interopDefaultLegacy(express);
var dotenv__default = /* @__PURE__ */ _interopDefaultLegacy(dotenv);
var cors__default = /* @__PURE__ */ _interopDefaultLegacy(cors);
dotenv__default["default"].config();
const { user, host, schema, pass } = process.env;
const URI = `postgresql://${user}:${pass}@${host}/${schema}`;
const sequelize = new sequelize$1.Sequelize(URI, {
  dialect: "postgres",
  logging: false
});
const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
const app = express__default["default"]();
app.use(express__default["default"].json());
app.use(cors__default["default"]());
connectToDB();
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!"
  });
});
dotenv__default["default"].config();
if (process.env.NODE_ENV !== "dev") {
  let port = process.env.PORT || 3e3;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
const viteNodeApp = app;
exports["default"] = app;
exports.viteNodeApp = viteNodeApp;
