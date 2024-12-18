import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, default: "unknown" },
  image: { type: String, default: "default-image-url" },
  savedJobs: [{ type: String }],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
