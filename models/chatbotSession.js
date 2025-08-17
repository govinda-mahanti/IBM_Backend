import mongoose from "mongoose";
/* const chatMessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ["user", "bot"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
const chatbotSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["therapist", "psychiatrist"], required: true },
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatBot",
    required: true,
  },
  sessionDate: { type: Date, default: Date.now },
  duration: { type: Number },
  messages: [chatMessageSchema],
  moodBefore: { type: Number },
  moodAfter: { type: Number },
  feedback: { type: String },
});

const chatBotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  type: { type: String, enum: ["therapist", "psychiatrist"], required: true },
  promptTemplate: { type: String },
  description: { type: String },
  avatarUrl: { type: String },
});

const ChatBot = mongoose.model("ChatBot", chatBotSchema);
const ChatbotSession = mongoose.model("ChatbotSession", chatbotSessionSchema);
export { ChatBot, ChatbotSession };
 */

const chatbotSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sessionType: {
    type: String,
    enum: ["therapist", "psychiatrist"],
    required: true,
  },
  therapistBotId: { type: mongoose.Schema.Types.ObjectId, ref: "TherapistBot" },
  psychiatristBotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PsychiatristBot",
  },
  sessionDate: { type: Date, default: Date.now },
  duration: { type: Number },
  moodBefore: { type: Number },
  moodAfter: { type: Number },
  feedback: { type: String },
  messages: [chatMessageSchema],
});
const chatMessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ["user", "bot"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatbotSession = mongoose.model("ChatbotSession", chatbotSessionSchema);
export default ChatbotSession;
