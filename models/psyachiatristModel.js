import mongoose from "mongoose";

const psychiatristBotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true }, // e.g., "Anxiety", "Medication", etc.
  promptTemplate: { type: String },
  description: { type: String },
  avatarUrl: { type: String },
});

const PsychiatristBot = mongoose.model(
  "PsychiatristBot",
  psychiatristBotSchema
);
export default PsychiatristBot;
