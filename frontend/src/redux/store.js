import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";

// fav
import favoritesReducer from "./features/favourites/favoritesSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";

const initialFavorites = getFavoritesFromLocalStorage() || [];

// import favoritesReducer from "../redux/features/favorites/favoriteSlice";
// import cartSliceReducer from "../redux/features/cart/cartSlice";
// import shopReducer from "../redux/features/shop/shopSlice";
// import { getFavoritesFromLocalStorage } from "../Utils/localStorage";

// const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    // favorites: favoritesReducer,
    // cart: cartSliceReducer,
    // shop: shopReducer,
  },

  preloadedState: {
    favorites: initialFavorites,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;