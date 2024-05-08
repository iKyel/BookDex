import { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetFilteredBooksQuery } from "../redux/api/bookApiSlice";
import { useFetchDemographicsQuery } from "../redux/api/demographicsApiSlice";
import Books from "./Books/Books";
import {
  setDemographicFilter,
  setPriceFilter,
} from "../redux/features/shop/shopSlice";
import AdminMenu from "./Admin/AdminMenu";

const Shop = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDemographic, setCurrentDemographic] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

  const { data: demographics } = useFetchDemographicsQuery();

  const {
    data: books,
    isLoading,
    isError,
  } = useGetFilteredBooksQuery({
    demographic: currentDemographic,
    price: currentPrice,
    name: searchTerm,
    sortOrder,
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDemographicChange = (e) => {
    const selectedDemographic = e.target.value;
    setCurrentDemographic(selectedDemographic);
    dispatch(setDemographicFilter([selectedDemographic]));
  };

  const handlePriceChange = (e) => {
    const selectedPrice = e.target.value;
    setCurrentPrice(selectedPrice);
    dispatch(setPriceFilter([selectedPrice]));
  };

  const handleSortOrderChange = (e) => {
    const selectedSortOrder = e.target.value;
    setSortOrder(selectedSortOrder);
    dispatch(setSortOrder(selectedSortOrder));
  };

  if (isLoading) {
    return <div className="text-center mt-4">Đang tải...</div>;
  }

  if (isError) {
    return <div className="text-center mt-4">Lỗi khi tải sách.</div>;
  }

  return (
    <>
      <AdminMenu />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none w-full mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <select
              id="demographic-filter"
              value={currentDemographic}
              onChange={handleDemographicChange}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none w-full"
            >
              <option value="">Tất cả thể loại</option>
              {demographics &&
                demographics.map((demographic) => (
                  <option key={demographic._id} value={demographic._id}>
                    {demographic.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <select
              id="price-filter"
              value={currentPrice}
              onChange={handlePriceChange}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none w-full"
            >
              <option value="">Tất cả giá</option>
              <option value="0-50000">0đ - 50000đ</option>
              <option value="50000-200000">50000đ - 200000đ</option>
              <option value="200000-">Trên 200000đ</option>
              {/* Thêm các tùy chọn giá khác nếu cần */}
            </select>
          </div>
          <div>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none w-full"
            >
              <option value="">Tất cả giá</option>
              <option value="ascending_price">Giá: Thấp đến cao</option>
              <option value="descending_price">Giá: Cao đến thấp</option>
              <option value="alphabetical">Tên: A đến Z</option>
              <option value="reverse_alphabetical">Tên: Z đến A</option>
              <option value="ascending_rating">Rating: cao đến thấp</option>
              <option value="descending_rating">Rating: thấp đến cao</option>F
            </select>
          </div>
        </div>
        <Books books={books} />
      </div>
    </>
  );
};

export default Shop;
