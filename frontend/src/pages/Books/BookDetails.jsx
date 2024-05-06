import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetBookByIdQuery,
  useCreateReviewMutation,
} from "../../redux/api/bookApiSlice";
import Loader from "../../components/Loader";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./components/HeartIcon";
import Ratings from "./components/Rating";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookDetails = () => {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: book, isLoading, refetch, error } = useGetBookByIdQuery(bookId);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingBookReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        bookId,
        rating,
        comment,
        name: userInfo.name,
      }).unwrap();
      setRating(0);
      setComment("");
      toast.success("Review submitted successfully");
      refetch();
    } catch (err) {
      toast.error("Bạn đã đánh giá quyển sách này rồi!");
    }
  };

  const addToCardHandler = () => {
    dispatch(addToCart({...book, qty}))
    navigate('/cart')
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.data.message || error.error}</div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex">
              <div className="w-1/3 p-8">
                <img
                  src={book.cover}
                  alt={book.name}
                  className="w-full h-auto"
                />
              </div>
              <div className="w-2/3 p-8">
                <h2 className="text-3xl font-bold mb-4">{book.name}</h2>
                <p className="text-gray-600 mb-2 flex">
                  <strong className="pr-2">Thêm vào yêu thích!</strong>{" "}
                  <HeartIcon book={book} />
                </p>
                <p className="text-gray-600 mb-4">{book.synopsis}</p>
                <p className="text-gray-600 mb-2">
                  <strong>Author:</strong> {book.author.name}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Publisher: </strong>
                  <a
                    href={book.publisher}
                    className="text-blue-500 hover:text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {book.publisher}
                  </a>
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Pages:</strong> {book.number_of_pages}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Rating:</strong>{" "}
                  {book.rating ? (
                    <span className="text-yellow-500 flex items-center">
                      {book.rating} <FaStar className="ml-1" />
                    </span>
                  ) : (
                    <span>No rating</span>
                  )}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Price:</strong> ${book.price}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Stock:</strong>{" "}
                  {book.countInStock > 0 ? (
                    <span className="text-green-500">
                      {book.countInStock} in stock
                    </span>
                  ) : (
                    <span className="text-red-500">Out of stock</span>
                  )}
                </p>
                <div className="flex justify-between items-center">
                  <Ratings
                    value={book.rating}
                    text={`${book.numReviews} reviews`}
                  />

                  {book.countInStock > 0 && (
                    <div className="ml-4">
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="py-1 px-2 border border-gray-300 rounded-md"
                      >
                        {[...Array(book.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    onClick={addToCardHandler}
                    disabled={book.countInStock === 0}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Reviews</h3>
              {book.reviews.length === 0 && (
                <p className="text-gray-600">No reviews yet</p>
              )}
              {book.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-100 p-4 rounded-lg mb-4"
                >
                  <p className="text-gray-800 font-bold">{review.name}</p>
                  <p className="text-yellow-500 flex items-center">
                    Rating: {review.rating} <FaStar className="ml-1" />
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Đánh giá:</span>{" "}
                    {review.comment}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {moment(review.createdAt).calendar()}
                  </p>
                </div>
              ))}
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <h4 className="text-xl font-bold mb-4">Write a review</h4>
                  <div className="mb-4">
                    <label
                      htmlFor="rating"
                      className="block font-bold mb-2 text-gray-700"
                    >
                      Rating
                    </label>
                    <select
                      required
                      name="rating"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="comment"
                      className="block font-bold mb-2 text-gray-700"
                    >
                      Comment
                    </label>
                    <textarea
                      required
                      name="comment"
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loadingBookReview}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Please log in to write a review
                  </p>
                  <Link
                    to="/login"
                    className="text-blue-500 hover:text-blue-600 font-bold"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
