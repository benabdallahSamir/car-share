import express from "express";
import {
  gotoConfirmationCarPage,
  gotoDocumentCarPage,
  gotoNewCarPage,
  gotoPhotoCarPage,
  gotoTraficationCarPage,
} from "../controllers/car.js";
import { verifyToken } from "../middlewars/token.js";

const router = express.Router();

router.get("/enregister-vehicule",verifyToken, gotoNewCarPage);
router.get("/enregistrer-tarification",verifyToken, gotoTraficationCarPage);
router.get("/enregistrer-photo",verifyToken, gotoPhotoCarPage);
router.get("/enregistrer-document",verifyToken, gotoDocumentCarPage);
router.get("/enregistrer-confirmation",verifyToken, gotoConfirmationCarPage);

export default router;
