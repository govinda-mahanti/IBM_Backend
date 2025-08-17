import mongoose from "mongoose";
/* const yogaSessionLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  yogaVideoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "YogaVideo",
    required: true,
  },
  sessionDate: { type: Date, default: Date.now },
  duration: { type: Number },
  moodBefore: { type: Number },
  moodAfter: { type: Number },
  feedback: { type: String },
}); */
const yogaSessionLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  yogaVideoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "YogaVideo",
    required: true,
  },
  sessionDate: { type: Date, default: Date.now },
  duration: { type: Number },
  moodBefore: { type: Number },
  moodAfter: { type: Number },
  feedback: { type: String },
});

const YogaSessionLog = mongoose.model("YogaSessionLog", yogaSessionLogSchema);
export default YogaSessionLog;
