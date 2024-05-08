import { useGetTopSellingBooksQuery } from "../../../redux/api/orderApiSlice"
import { useEffect } from "react";
import BooksForOrders from "./BooksForOrders";

const TopSellingBooks = () => {
    const {data: books, refetch, isLoading} = useGetTopSellingBooksQuery()
    console.log(books)
    useEffect(() => {
        refetch();
      }, [refetch]);
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mt-10 mb-4">
        Sách Được Bán Chạy Nhất
      </h2>
      {isLoading ? <p>Đang tải...</p> : <BooksForOrders books={books} />}
    </div>
  )
}

export default TopSellingBooks
