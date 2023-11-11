import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
