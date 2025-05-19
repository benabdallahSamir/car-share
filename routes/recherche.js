import express from "express";
import { verifyToken } from "../middlewars/token.js";
import { gotoRecherchePage } from "../controllers/recherche.js";

const router = express.Router();

router.get("/",verifyToken , gotoRecherchePage)

export default router;
