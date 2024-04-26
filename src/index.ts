import { QueueClient } from "./kafka/queueClient";

const express = require("express");
const cors = require("cors");
const { createConnection } = require("typeorm");
const { routes } = require("./routes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

createConnection(
  {
      "type": "mysql",
      "host": process.env.DATABASE_HOST,
      "port": 3306,
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_DATABASE,
      "synchronize": true,
      "logging": false,
      "entities": ["src/entity/*.ts"]
  }).then(async () => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000","http://localhost:4000","http://localhost:5000"],
    })
  );

  routes(app);

  app.listen(process.env.PORT, () => {
    console.log("listening to port ", process.env.PORT);
  });
});

QueueClient().then(console.error);
