import mongoose from "mongoose";
const vrCharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relation: { type: String },
  avatarUrl: { type: String },
});

const VRCharacter = mongoose.model("VRCharacter", vrCharacterSchema);
export default VRCharacter;
