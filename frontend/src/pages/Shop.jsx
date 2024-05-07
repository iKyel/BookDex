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
  });

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
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-4">Error fetching books.</div>;
  }

  return (
    <>
      <AdminMenu />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="demographic-filter"
              className="block text-gray-700 font-semibold mb-2"
            >
              Filter by Demographic:
            </label>
            <select
              id="demographic-filter"
              value={currentDemographic}
              onChange={handleDemographicChange}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none w-full"
            >
              <option value="">All Demographics</option>
              {demographics &&
                demographics.map((demographic) => (
                  <option key={demographic._id} value={demographic._id}>
                    {demographic.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="price-filter"
              className="block text-gray-700 font-semibold mb-2"
            >
              Filter by Price:
            </label>
            <select
              id="price-filter"
              value={currentPrice}
              onChange={handlePriceChange}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none w-full"
            >
              <option value="">All Prices</option>
              <option value="0-100">$0 - $100</option>
              <option value="10-200">$100 - $200</option>
              <option value="200-">Over $200</option>
              {/* Thêm các tùy chọn giá khác nếu cần */}
            </select>
          </div>
        </div>
        <Books books={books} />
      </div>
    </>
  );
};

export default Shop;
