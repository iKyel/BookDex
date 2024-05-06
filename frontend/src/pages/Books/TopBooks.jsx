// import axios from "axios";
// import { AUTHOR_URL } from "../../redux/constants";
// import { useEffect, useState } from "react";
import { useGetTopBooksQuery } from "../../redux/api/bookApiSlice";
import { Link } from "react-router-dom";
import HeartIcon from "./components/HeartIcon";

const TopBooks = () => {
  const { data: topBooks, isLoading: isLoadingTopBooks } =
    useGetTopBooksQuery();

  const addToCart = (bookId) => {
    // Tạm thời chỉ log để minh họa, bạn cần thay đổi hành động này để thêm vào giỏ hàng thực tế
    console.log(`Thêm sách có ID ${bookId} vào giỏ hàng`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mt-10 mb-4">Top Rated Books</h2>
      {isLoadingTopBooks ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={book.cover}
                alt={book.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <Link to={`/books/${book._id}`}>
                  <h3 className="text-lg font-semibold mb-2">{book.name}</h3>
                </Link>

                <p className="text-gray-800 italic">Giá: {book.price}</p>
                <p className="text-gray-800">
                  Rating: {Math.round(book.rating)}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => addToCart(book._id)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center"
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
                    Add to Cart
                  </button>
                  <div className="mt-8">
                    <HeartIcon book={book} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBooks;
