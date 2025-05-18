import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    // Basic information
    marque: {
      type: String,
    },
    modele: {
      type: String,
    },
    Description: {
      type: String,
    },

    // Technical specifications
    Carburant: {
      type: String,
    },
    cardGris: {
      type: String,
    },
    permis: {
      type: String,
    },
    Caracteristiques: {
      type: [String],
      default: [],
    },
    userId: {
      type: String,
    },
    prix: {
      type: Number,
    },
    Kilometrage: {
      type: Number,
    },
    Places: {
      type: Number,
    },
    Annee: {
      type: Number,
    },
    remiseSemaine: {
      type: Number,
      default: 0,
    },
    remiseMois: {
      type: Number,
      default: 0,
    },

    // Images
    carImg: {
      type: String,
      default: "",
    },

    // Availability and status
    est_disponible: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["en_attente", "publiée", "refusée", "archivée"],
      default: "en_attente",
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
