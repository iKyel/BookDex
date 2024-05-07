import { Link } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import { useAllBooksAdminQuery } from "../../../redux/api/bookApiSlice";
import AdminMenu from "../AdminMenu";

const AllBooks = () => {
  const {
    data: books,
    refetch,
    isLoading,
    isError,
    error,
  } = useAllBooksAdminQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div>
      <AdminMenu />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">All Books</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {error.data?.message}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {books.books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/book/${book._id}`}>
                  <img
                    src={book.cover}
                    alt={book.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">
                    <Link to={`/admin/books/update/${book._id}`}>
                      {book.name}
                    </Link>
                  </h3>

                  <p className="bg-gray-100 text-gray-800 p-2 rounded">
                    {book.synopsis.substring(0, 100)}...
                  </p>
                  <p className="text-gray-600">
                    Published: {moment(book.createdAt).format("YYYY-MM-DD")}
                  </p>
                  <p className="text-gray-600">
                    Rating: {book.rating} ({book.numReviews} reviews)
                  </p>
                  <p className="text-gray-600">Price: ${book.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
