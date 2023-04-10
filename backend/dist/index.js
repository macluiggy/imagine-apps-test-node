"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var express = require("express");
var expressValidation = require("express-validation");
var sequelize$1 = require("sequelize");
var dotenv = require("dotenv");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var cors = require("cors");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var express__default = /* @__PURE__ */ _interopDefaultLegacy(express);
var dotenv__default = /* @__PURE__ */ _interopDefaultLegacy(dotenv);
var bcrypt__default = /* @__PURE__ */ _interopDefaultLegacy(bcrypt);
var jwt__default = /* @__PURE__ */ _interopDefaultLegacy(jwt);
var cors__default = /* @__PURE__ */ _interopDefaultLegacy(cors);
const hello = (req, res) => {
  res.send("Hello World from api!");
};
const router$2 = express.Router();
router$2.route("/api/hello").get(hello);
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
process.env;
const property = sequelize.define(
  "property",
  {
    address: {
      type: sequelize$1.DataTypes.STRING
    },
    city: {
      type: sequelize$1.DataTypes.STRING
    },
    price: {
      type: sequelize$1.DataTypes.DECIMAL
    },
    description: {
      type: sequelize$1.DataTypes.TEXT
    },
    year: {
      type: sequelize$1.DataTypes.INTEGER
    },
    id: {
      type: sequelize$1.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status_id: {
      type: sequelize$1.DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: "property"
  }
);
const Status = sequelize.define(
  "status",
  {
    id: {
      type: sequelize$1.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: sequelize$1.DataTypes.STRING
    },
    label: {
      type: sequelize$1.DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: "status"
  }
);
const StatusHistory = sequelize.define(
  "status_history",
  {
    id: {
      type: sequelize$1.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    property_id: {
      type: sequelize$1.DataTypes.INTEGER
    },
    update_date: {
      type: sequelize$1.DataTypes.DATE
    },
    status_id: {
      type: sequelize$1.DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: "status_history"
  }
);
const users = sequelize.define(
  "users",
  {
    id: {
      type: sequelize$1.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: sequelize$1.DataTypes.STRING
    },
    password: {
      type: sequelize$1.DataTypes.TEXT
    }
  },
  {
    timestamps: false,
    tableName: "users"
  }
);
property.hasMany(StatusHistory, { foreignKey: "property_id" });
StatusHistory.belongsTo(property, { foreignKey: "property_id" });
StatusHistory.belongsTo(Status, { foreignKey: "status_id" });
Status.hasMany(StatusHistory, { foreignKey: "status_id" });
const router$1 = express.Router();
const registerValidation = {
  body: expressValidation.Joi.object({
    password: expressValidation.Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    username: expressValidation.Joi.string().required()
  })
};
const loginValidation = {
  body: expressValidation.Joi.object({
    username: expressValidation.Joi.string().required(),
    password: expressValidation.Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
  })
};
router$1.post("/login", expressValidation.validate(loginValidation, {}, {}), async (req, res) => {
  try {
    const { username, password } = req.body;
    const user2 = await users.findOne({
      attributes: ["id", "username", "password"],
      where: {
        username
      }
    });
    if (!user2) {
      throw new Error("Usuario no encontrado");
    }
    const matchPassword = await bcrypt__default["default"].compare(password, user2.password);
    if (!matchPassword) {
      throw new Error("Contrase\xF1a incorrecta");
    }
    const token = jwt__default["default"].sign({ id: user2.id }, process.env.JWT_SECRET, {
      expiresIn: 86400
    });
    res.json({
      user: user2,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message
    });
  }
});
router$1.post(
  "/signup",
  expressValidation.validate(registerValidation, {}, {}),
  async (req, res) => {
    try {
      const { password, nombre, username } = req.body;
      const userFound = await users.findAll({
        attributes: ["id", "username"],
        where: {
          username
        }
      });
      if (userFound.length > 0) {
        throw new Error("Usuario ya existe");
      }
      const encryptedPassword = bcrypt__default["default"].hashSync(password, 10);
      const user2 = await users.create({
        password: encryptedPassword,
        nombre,
        username
      });
      res.json({
        message: "Usuario creado",
        user: user2
      });
    } catch (error) {
      console.log("error");
      res.status(404).json({
        error: error.message
      });
    }
  }
);
const get = async (req, res) => {
  try {
    let { address, city, year } = Object.keys(req.query).length > 0 ? req.query : req.body;
    const _year = parseInt(year);
    const filtros = {};
    if (address) {
      filtros.address = {
        [sequelize$1.Op.iLike]: `%${address}%`
      };
    }
    if (city) {
      filtros.city = {
        [sequelize$1.Op.iLike]: `%${city}%`
      };
    }
    if (year) {
      filtros.year = _year;
    }
    const _prop = await property.findAll({
      attributes: ["address", "city", "price", "description", "id"],
      raw: true,
      where: {
        ...filtros
      },
      include: [
        {
          model: StatusHistory,
          attributes: ["property_id", "status_id"],
          order: [["update_date", "DESC"]],
          limit: 1,
          include: [
            {
              model: Status
            }
          ]
        }
      ]
    });
    const prop = _prop.map((prop2) => {
      const { address: address2, city: city2, price, description } = prop2;
      return {
        address: address2,
        city: city2,
        price,
        description
      };
    });
    return res.status(200).json({
      error: false,
      message: "Se obtuvieron las propiedades",
      data: prop
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: true,
      message: error.message,
      data: []
    });
  }
};
express.Router();
function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    req.body.estaLogueado = false;
    next();
    return;
  }
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
  try {
    const decoded = jwt__default["default"].verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.body.estaLogueado = true;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inv\xE1lido" });
  }
}
const router = express.Router();
router.get("/properties", verifyToken, get);
const app = express__default["default"]();
app.use(express__default["default"].json());
app.use(cors__default["default"]());
connectToDB();
app.use("/", router$2);
app.use("/api", router$1);
app.use("/api", router);
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
