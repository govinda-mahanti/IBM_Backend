import mongoose from "mongoose";

const vrEnvironmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String },
  vrFileUrl: { type: String, required: true }, // 3D scene file
  duration: { type: Number }, // suggested duration in minutes
  createdAt: { type: Date, default: Date.now },
});

const VREnvironment = mongoose.model("VREnvironment", vrEnvironmentSchema);
export default VREnvironment;
