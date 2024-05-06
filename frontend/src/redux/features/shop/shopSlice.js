import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  filters: {
    rating: [],
    price: [],
    demographics: [],
    authors: [],
    publishers: [],
  },
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.filters.rating = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.filters.price = action.payload;
    },
    setDemographicFilter: (state, action) => {
      state.filters.demographics = action.payload;
    },
    setAuthorFilter: (state, action) => {
      state.filters.authors = action.payload;
    },
    setPublisherFilter: (state, action) => {
      state.filters.publishers = action.payload;
    },
  },
});

export const {
  setBooks,
  setRatingFilter,
  setPriceFilter,
  setDemographicFilter,
  setAuthorFilter,
  setPublisherFilter,
} = shopSlice.actions;

export default shopSlice.reducer;