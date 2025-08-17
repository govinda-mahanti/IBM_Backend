import mongoose from "mongoose";
const therapistBotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true }, // e.g., "CBT", "DBT", etc.
  promptTemplate: { type: String },
  description: { type: String },
  avatarUrl: { type: String },
});

const TherapistBot = mongoose.model("TherapistBot", therapistBotSchema);
export default TherapistBot;
