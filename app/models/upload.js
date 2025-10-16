import mongoose, { Schema, models } from "mongoose";

const UploadSchema = new Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Upload = models.Upload || mongoose.model("Upload", UploadSchema);

export default Upload;
