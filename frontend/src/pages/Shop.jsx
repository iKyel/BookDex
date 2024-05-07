import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { data: demographics } = useFetchDemographicsQuery();

  const priceFilter = useSelector((state) => state.shop.filters.price);
  const {
    data: books,
    isLoading,
    isError,
  } = useGetFilteredBooksQuery({
    demographic: currentDemographic,
    price: currentPrice,
    name: searchTerm,
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
              <option value="0-50000đ">0đ - 50000đ</option>
              <option value="50000-200000">50000đ - 200000đ</option>
              <option value="200000-">Trên 200000đ</option>
              {/* Thêm các tùy chọn giá khác nếu cần */}
            </select>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none w-full"
          />
        </div>
        <Books books={books} />
      </div>
    </>
  );
};

export default Shop;
