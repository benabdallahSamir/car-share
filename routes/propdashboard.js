import express from "express";
import { verifyToken } from "../middlewars/token.js";
import {
  getoMainPropDashboard,
  getoPropChat,
  getoPropMyCars,
  getoPropReservations,
  getoPropRevenu,
  gotoPropDisponibility,
} from "../controllers/propDashboard.js";
const router = express.Router();

router.get("/dashboard-proprietaire", verifyToken, getoMainPropDashboard);
router.get("/disponibilite", verifyToken, gotoPropDisponibility);
router.get("/reservations", verifyToken, getoPropReservations);
router.get("/revenus", verifyToken, getoPropRevenu);
router.get("/mes-vehicules", verifyToken, getoPropMyCars);
router.get("/chat", verifyToken, getoPropChat);

export default router;
