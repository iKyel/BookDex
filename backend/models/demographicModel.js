import mongoose from "mongoose";

const demographicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Demographic", demographicSchema);
