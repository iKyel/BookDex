import { useState, useEffect } from "react";
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
import AdminMenu from "../Admin/AdminMenu";
import { useFetchAuthorDetailsQuery } from "../../redux/api/authorApiSlice";
import { useFetchDemographicDetailsQuery } from "../../redux/api/demographicsApiSlice";

const BookDetails = () => {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [demographicName, setDemographicName] = useState("");

  const { data: book, isLoading, refetch, error } = useGetBookByIdQuery(bookId);
  const { data: author } = useFetchAuthorDetailsQuery(book && book.author);
  const { data: demographic } = useFetchDemographicDetailsQuery(
    book && book.demographic
  );

  useEffect(() => {
    if (author) {
      setAuthorName(author.name);
    }
  }, [author]);

  useEffect(() => {
    if (demographic) {
      setDemographicName(demographic.name);
    }
  }, [demographic]);

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
      toast.success("Đánh giá được gửi thành công");
      refetch();
    } catch (err) {
      toast.error("Bạn đã đánh giá quyển sách này rồi!");
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...book, qty }));
    navigate("/cart");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminMenu />
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
                <Link to={`/admin/books/update/${book._id}`}>
                  <button className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 inline-block mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 4.293a1 1 0 0 1 1.414 1.414L6.414 15.414a1 1 0 0 1-1.414-1.414L14.707 4.293zm1.414 1.414L5.707 16.707a1 1 0 1 1-1.414-1.414L15.707 4.293a1 1 0 1 1 1.414 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Chỉnh sửa
                  </button>
                </Link>
              </div>
              <div className="w-2/3 p-8">
                <h2 className="text-3xl font-bold mb-4">{book.name}</h2>
                <p className="text-gray-600 mb-2 flex">
                  <strong className="pr-2">Thêm vào yêu thích!</strong>{" "}
                  <HeartIcon book={book} />
                </p>
                <p className="text-gray-600 mb-4">{book.synopsis}</p>
                <p className="text-gray-600 mb-2">
                  <strong>Tác giả:</strong> <Link to={`/books/author/${book.author}`} className="text-blue-500 hover:text-blue-600">{authorName}</Link> 
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Thể loại::</strong> {demographicName}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Nhà xuất bản: </strong>
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
                  <strong>Trang:</strong> {book.number_of_pages}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Đánh giá:</strong>{" "}
                  {book.rating ? (
                    <span className="text-yellow-500 flex items-center">
                      {book.rating} <FaStar className="ml-1" />
                    </span>
                  ) : (
                    <span>Chưa có đánh giá</span>
                  )}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Giá:</strong> {book.price}đ
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Tồn kho:</strong>{" "}
                  {book.countInStock > 0 ? (
                    <span className="text-green-500">
                      Còn hàng
                      <>
                        {userInfo &&
                          userInfo.isAdmin &&
                          ` (${book.countInStock} có sẵn)`}
                      </>
                    </span>
                  ) : (
                    <span className="text-red-500">Hết hàng</span>
                  )}
                </p>
                <div className="flex justify-between items-center">
                  <Ratings
                    value={book.rating}
                    text={`${book.numReviews} đánh giá`}
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
                    onClick={addToCartHandler}
                    disabled={book.countInStock === 0}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 ${
                      book.countInStock === 0 ? "cursor-not-allowed" : ""
                    }`}
                  >
                    {book.countInStock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
                  </button>
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Nhận xét</h3>
              {book.reviews.length === 0 && (
                <p className="text-gray-600">Chưa có nhận xét</p>
              )}
              {book.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-100 p-4 rounded-lg mb-4"
                >
                  <p className="text-gray-800 font-bold">{review.name}</p>
                  <p className="text-yellow-500 flex items-center">
                    Đánh giá: {review.rating} <FaStar className="ml-1" />
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Nhận xét:</span>{" "}
                    {review.comment}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {moment(review.createdAt).calendar()}
                  </p>
                </div>
              ))}
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <h4 className="text-xl font-bold mb-4">Viết nhận xét</h4>
                  <div className="mb-4">
                    <label
                      htmlFor="rating"
                      className="block font-bold mb-2 text-gray-700"
                    >
                      Đánh giá
                    </label>
                    <select
                      required
                      name="rating"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn...</option>
                      <option value="1">1 - Kém</option>
                      <option value="2">2 - Tạm được</option>
                      <option value="3">3 - Tốt</option>
                      <option value="4">4 - Rất tốt</option>
                      <option value="5">5 - Xuất sắc</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="comment"
                      className="block font-bold mb-2 text-gray-700"
                    >
                      Nhận xét
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
                    Gửi
                  </button>
                </form>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Vui lòng đăng nhập để viết nhận xét
                  </p>
                  <Link
                    to="/login"
                    className="text-blue-500 hover:text-blue-600 font-bold"
                  >
                    Đăng nhập
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
