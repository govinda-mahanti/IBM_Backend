import mongoose from "mongoose";
const arSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  environmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AREnvironment",
    required: true,
  },
  psychiatristBotId: { type: mongoose.Schema.Types.ObjectId, ref: "ChatBot" },
  sessionDate: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
  moodBefore: { type: Number },
  moodAfter: { type: Number },
  feedback: { type: String },
  interactionData: { type: Object }, // Optional for AR specifics
});

const ARSession = mongoose.model("ARSession", arSessionSchema);
export default ARSession;
