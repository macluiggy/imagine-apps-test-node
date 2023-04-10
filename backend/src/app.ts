import express from "express";
// import indexRoute from "./routes/index.route";
// import authRoute from "./routes/auth.routes";
// import PropertyRoute from "./routes/properties.routes";
import connectToDB from "./db";

import cors from "cors";
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
connectToDB();

//routes
// app.use("/", indexRoute);
// app.use("/api", authRoute);
// app.use("/api", PropertyRoute);

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.json({
    message: "Hello World!",
  });
});

export default app;
