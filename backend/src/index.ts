import app from "./app";
import dotenv from "dotenv";
dotenv.config();

if (process.env.NODE_ENV !== 'dev') {
let port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
} 

export default app;
export const viteNodeApp = app;
// babel-node --extensions \".ts\" src/index.ts
// webpack --mode=development --config ./webpack.config.js && node ./dist/bundle.js
