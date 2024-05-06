
import { useGetTopBooksQuery } from "../../redux/api/bookApiSlice";
import Books from "./Books";

const TopBooks = () => {
  const { data: topBooks, isLoading: isLoadingTopBooks } =
    useGetTopBooksQuery();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mt-10 mb-4">Top Rated Books</h2>
      {isLoadingTopBooks ? (
        <p>Loading...</p>
      ) : <Books books={topBooks}/>}
    </div>
  );
};

export default TopBooks;
