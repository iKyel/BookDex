import { useSelector } from "react-redux";

const FavoritesCount = () => {
    const favorites = useSelector((state) => state.favorites);
    const favoriteCount = favorites.length;
  
    return (
      <div className="relative">
        {favoriteCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-full">
            {favoriteCount}
          </span>
        )}
      </div>
    );
  };
  
  export default FavoritesCount;