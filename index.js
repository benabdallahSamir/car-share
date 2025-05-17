import { configDotenv } from "dotenv";
import express from "express";
import {connectDB} from "./utils/utils.js";

const app = express();

configDotenv();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the car location API" });
});

// * listennig server
const port = process.env.PORT || 3001;

const serverListener = () => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
};
connectDB(serverListener);
