import express from "express";
import indexRoute from "./routes/index.route";
import authRoute from "./routes/auth.routes";
import clienteRoute from "./routes/cliente.routes";
import departamentosRoute from "./routes/departamentos.routes";
import cors from "cors";
const app = express();

// middlewares
app.use(express.json());
app.use(cors()); //nunca te olvides de poner esto, si es que vas a usar las api de otro lado, osea de otro dominio o proxy

//routes
app.use("/", indexRoute);
app.use('/api', authRoute)
app.use('/api', clienteRoute)
app.use('/api', departamentosRoute)

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.json({
    message: "Hello World!",
  }) 
});

export default app;
