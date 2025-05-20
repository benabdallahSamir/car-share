import express from "express";
import { accessToken } from "../middlewars/token.js";
import accessAdmin, { gotoAdminPage, gotoAdminUsersPage } from "../controllers/admin.js";
const router = express.Router();

router.get("/admin", accessToken, accessAdmin, gotoAdminPage);
router.get("/users", accessToken, accessAdmin, gotoAdminUsersPage);

export default router;
