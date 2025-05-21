import express from "express";
import upload from "../utils/multer.js";
import { accessToken, verifyToken } from "../middlewars/token.js";
import { addCarImg, addDocuments, createNewCard } from "../controllers/car.js";
import accessAdmin, { accountStatus, carStatus } from "../controllers/admin.js";
const router = express.Router();

router.post("/car", accessToken, upload.array("images"), createNewCard);
router.post(
  "/car/documents",
  accessToken,
  upload.array("images"),
  addDocuments
);
router.post("/car/image", accessToken, upload.single("images"), addCarImg);
router.put("/user/accountStatus", verifyToken, accessAdmin, accountStatus);
router.put("/user/carStatus", verifyToken, accessAdmin, carStatus);
export default router;
