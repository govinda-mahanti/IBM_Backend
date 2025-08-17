import mongoose from "mongoose";
const yogaVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  duration: { type: Number },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  createdAt: { type: Date, default: Date.now },
});
const YogaVideo = mongoose.model("YogaVideo", yogaVideoSchema);
export default YogaVideo;
