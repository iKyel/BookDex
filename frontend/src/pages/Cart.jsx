import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
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
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
        {cartItems.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">Giỏ hàng của bạn đang trống</p>
            <button
              onClick={() => navigate("/home")}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tổng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={item.cover}
                            alt={item.name}
                            className="w-16 h-16 object-contain mr-4"
                          />
                          <Link
                            to={`/books/${item._id}`}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {item.price.toLocaleString()} đ
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24">
                          <select
                            className="w-full p-1 border rounded text-black"
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {(item.price * item.qty).toLocaleString()} đ
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeFromCartHandler(item._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <p className="text-gray-700 font-bold">Tổng cộng:</p>
                  <p className="text-2xl text-gray-900">
                    {getCartTotal().toLocaleString()} đ
                  </p>
                </div>
                <button
                  onClick={checkoutHandler}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
