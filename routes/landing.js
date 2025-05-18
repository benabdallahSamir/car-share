import express from "express";
import landingPage, { logout } from "../controllers/landing.js";

const router = express.Router();

router.get("/", landingPage);
router.get("/logout", logout);

export default router;
