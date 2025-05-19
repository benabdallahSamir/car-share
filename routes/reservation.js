import express from "express";
import { accessToken } from "../middlewars/token.js";
import { makeReserveation } from "../controllers/reservation.js";

const router = express.Router();

router.post("/", accessToken, makeReserveation);

export default router;
