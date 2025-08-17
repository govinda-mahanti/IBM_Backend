import mongoose from "mongoose";
const arEnvironmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assetsUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const AREnvironment = mongoose.model("AREnvironment", arEnvironmentSchema);
export default AREnvironment;
