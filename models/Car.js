import mongoose from "mongoose";
const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
