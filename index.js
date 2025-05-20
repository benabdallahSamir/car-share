import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./utils/utils.js";
import {
  admin,
  api,
  auth,
  car,
  landing,
  propDashboard,
  recherche,
  reservation,
} from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
configDotenv();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", landing);
app.use("/", auth);
app.use("/", car);
app.use("/api", api);
app.use("/", propDashboard);
app.use("/recherche", recherche);
app.use("/reservation", reservation);
app.use("/", admin);

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
