import { useGetTopBooksQuery } from "../../redux/api/bookApiSlice";
import Books from "./Books";
import { useEffect } from "react";

const TopBooks = () => {
  const {
    data: topBooks,
    refetch,
    isLoading: isLoadingTopBooks,
  } = useGetTopBooksQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mt-10 mb-4">
        Sách Được Đánh Giá Cao Nhất
      </h2>
      {isLoadingTopBooks ? <p>Đang tải...</p> : <Books books={topBooks} />}
    </div>
  );
};

export default TopBooks;
