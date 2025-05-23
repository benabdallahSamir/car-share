import express from "express";
import landingPage, { logout } from "../controllers/landing.js";
import { verifyToken } from "../middlewars/token.js";

const router = express.Router();

router.get("/", verifyToken, landingPage);
router.get("/logout", logout);

export default router;
