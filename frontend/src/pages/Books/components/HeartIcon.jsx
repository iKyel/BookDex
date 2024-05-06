import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../../redux/features/favourites/favoritesSlice";

import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../../../Utils/localStorage";

const HeartIcon = ({ book }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === book._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(book));
      // remove the book from the localStorage as well
      removeFavoriteFromLocalStorage(book._id);
    } else {
      dispatch(addToFavorites(book));
      // add the book to localStorage as well
      addFavoriteToLocalStorage(book);
    }
  };

  return (
    <div className="" onClick={toggleFavorites}>
      {isFavorite ? (
        <FaHeart className="text-pink-500 hover:text-red-500 transition duration-300 ease-in-out text-xl" />
      ) : (
        <FaRegHeart className=" hover:text-pink-500 transition duration-300 ease-in-out text-xl" />
      )}
    </div>
  );
};

export default HeartIcon;
