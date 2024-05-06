import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems)

  const addToCartHandler = (product, qty) => {
    const updatedQty =
      product.countInStock > 0 && qty <= product.countInStock
        ? qty
        : product.countInStock;
    dispatch(addToCart({ ...product, qty: updatedQty }));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <div className="max-w-7xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Giỏ hàng của bạn đang trống</p>
          <button
            onClick={() => navigate("/home")}
            className="text-white btn btn-primary mt-4 bg-blue-500 hover:from-green-500 hover:to-blue-600 hover:text-white px-6 py-3 rounded-lg"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Sản phẩm</th>
                  <th className="px-4 py-2">Giá</th>
                  <th className="px-4 py-2">Số lượng</th>
                  <th className="px-4 py-2">Tổng</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-2 flex items-center">
                      <img
                        src={item.cover}
                        alt={item.name}
                        className="w-16  object-contain mr-4"
                      />
                      <Link
                        to={`/books/${item._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2">{item.price} đ</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => addToCartHandler(item, item.qty - 1)}
                          disabled={item.qty === 1}
                          className="bg-gray-200 text-gray-700 rounded-l px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.qty}</span>
                        <button
                          onClick={() => addToCartHandler(item, item.qty + 1)}
                          className="bg-gray-200 text-gray-700 rounded-r px-2 py-1"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      {(item.price * item.qty).toLocaleString()} đ
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex justify-end">
            <div className="bg-gray-200 p-4 rounded-md">
              <p className="font-bold mb-2">Tổng cộng:</p>
              <p className="text-2xl">{getCartTotal().toLocaleString()} đ</p>
              <button
                onClick={checkoutHandler}
                className="btn btn-primary mt-4 w-full"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
