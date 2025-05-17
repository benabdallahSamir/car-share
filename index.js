import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./utils/utils.js";
import { auth, landing } from "./routes/routes.js";
import path from 'path';
import { fileURLToPath } from 'url';

configDotenv();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", landing);
app.use("/", auth);
// * listennig server
const port = process.env.PORT || 3001;

const serverListener = () => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
};
connectDB(serverListener);
