import express from "express";
import upload from "../utils/multer.js";
import { accessToken } from "../middlewars/token.js";
import { addCarImg, addDocuments, createNewCard } from "../controllers/car.js";

const router = express.Router();




router.post("/car", accessToken, upload.array("images"), createNewCard);
router.post("/car/documents", accessToken, upload.array("images"), addDocuments);
router.post("/car/image", accessToken, upload.single("images"), addCarImg);

export default router;
