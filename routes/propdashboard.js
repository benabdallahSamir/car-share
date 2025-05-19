import express from "express";
import { verifyToken } from "../middlewars/token.js";
import { getoMainPropDashboard, gotoPropDisponibility } from "../controllers/propDashboard.js";
const router = express.Router();

router.get("/dashboard-proprietaire", verifyToken, getoMainPropDashboard);
router.get("/disponibilite", verifyToken, gotoPropDisponibility);


export default router;
