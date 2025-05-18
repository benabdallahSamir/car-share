import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./utils/utils.js";
import { api, auth, car, landing } from "./routes/routes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import { accessToken } from "./middlewars/token.js";
import upload from "./utils/multer.js";
import { createNewCard } from "./controllers/car.js";

configDotenv();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", landing);
app.use("/", auth);
app.use("/", car);
app.use("/api", api);


app.use((_, res) => {
  res.render("404");
});
// * listennig server
const port = process.env.PORT || 3001;

const serverListener = () => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
};
connectDB(serverListener);
