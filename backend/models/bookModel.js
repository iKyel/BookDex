import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const bookSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    synopsis: { type: String, required: true },
    author: { type: ObjectId, ref: "Author", required: true },
    cover: { type: String, required: true },
    demographic: { type: ObjectId, ref: "Demographic", required: true },
    publisher: { type: String, required: true },
    number_of_pages: { type: Number, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
