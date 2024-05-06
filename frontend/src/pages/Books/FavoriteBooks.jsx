import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favourites/favoritesSlice";
import Books from "./Books";
const FavoriteBooks = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mt-10 mb-4">Sách Đã Lưu</h2>
        <Books books={favorites} />
      </div>
    </div>
  );
};

export default FavoriteBooks;
