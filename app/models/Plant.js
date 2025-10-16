import mongoose, { Schema } from "mongoose";

const PlantSchema = new Schema(
  {
    userId: { type: String, required: true },
    scientificName: { type: String },
    healthStatus: { type: String },
    careRecommendation: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Plant || mongoose.model("Plant", PlantSchema);
