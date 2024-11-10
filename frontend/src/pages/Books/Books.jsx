import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import HeartIcon from "./components/HeartIcon";
import { useSelector } from "react-redux";

const Books = ({ books }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const addToCartHandler = (book, qty) => {
    dispatch(addToCart({ ...book, qty }));
    toast.success(`Đã thêm sách ${book.name} vào giỏ hàng`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition duration-300 transform hover:scale-105"
          >
            <div className="flex-grow">
              <Link to={`/books/${book._id}`}>
                <img
                  src={book.cover}
                  alt={book.name}
                  className="w-full h-60 object-cover"
                />
                {userInfo && userInfo.isAdmin && (
                  <div className="p-4 flex justify-center">
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
                )}
              </Link>

              <div className="p-4">
                <Link to={`/books/${book._id}`}>
                  <h3 className="text-lg font-semibold mb-2 truncate">
                    {book.name}
                  </h3>
                </Link>
                <p className="text-gray-800 italic">Giá: {book.price}đ</p>
                <p className="text-gray-800">
                  Đánh giá: {Math.round(book.rating)}
                </p>
                <p className="text-gray-800">
                 Tồn kho: {book.countInStock > 0 ? (
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
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <button
                  onClick={() => addToCartHandler(book, 1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center"
                >
                  <svg
                    className="w-6 h-6 inline-block mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <div className="mt-4">
                  <HeartIcon book={book} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
