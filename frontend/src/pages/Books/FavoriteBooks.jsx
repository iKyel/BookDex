import { useSelector } from "react-redux"
import { selectFavoriteProduct } from "../../redux/features/favourites/favoritesSlice"
import TopBooks from "./TopBooks"

const FavoriteBooks = () => {
  const favorites = useSelector(selectFavoriteProduct)
  console.log(favorites)
  return (
    <div>
      
    </div>
  )
}

export default FavoriteBooks
