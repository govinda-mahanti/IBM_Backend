import mongoose from "mongoose";
/* const vrSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  environmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VREnvironment",
    required: true,
  },
  characterId: { type: mongoose.Schema.Types.ObjectId, ref: "VRCharacter" },
  sessionDate: { type: Date, default: Date.now },
  duration: { type: Number },
  moodBefore: { type: Number, min: 1, max: 10 },
  moodAfter: { type: Number, min: 1, max: 10 },
  feedback: { type: String },
}); */
const vrSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  environmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VREnvironment",
    required: true,
  },
  characterId: { type: mongoose.Schema.Types.ObjectId, ref: "VRCharacter" },
  sessionDate: { type: Date, default: Date.now },
  duration: { type: Number }, // Minutes spent in the session
  moodBefore: { type: Number, min: 1, max: 10 },
  moodAfter: { type: Number, min: 1, max: 10 },
  feedback: { type: String },
});

const VRSession = mongoose.model("VRSession", vrSessionSchema);
export default VRSession;
