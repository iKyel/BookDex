import { useSelector } from "react-redux";

const CartCount = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = new Set(cartItems.map((item) => item._id)).size;

  return (
    <div className="relative">
      {cartCount > 0 && (
        <span className="absolute right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-full">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartCount;