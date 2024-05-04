import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
    },
    biography: {
      type: String,
      default: "No biography"
    },
    whereToFind: [
      {
        type: String,
        trim: true
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Author", authorSchema);