import { QueueClient } from "./kafka/queueClient";

const express = require("express");
const cors = require("cors");
const { createConnection } = require("typeorm");
const { routes } = require("./routes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

createConnection().then(async () => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "http://localhost:4000",
        "http://localhost:5000",
      ],
    })
  );

  routes(app);

  app.listen(8000, () => {
    console.log("listening to port 8000");
  });
});

QueueClient().then(console.error);
