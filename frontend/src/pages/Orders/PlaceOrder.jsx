import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import ProgressSteps from "./components/ProgressSteps";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <ProgressSteps step1 step2 step3 />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Vận Chuyển</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <p>
                <span className="font-bold">Địa Chỉ:</span>{" "}
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Phương Thức Thanh Toán</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <p>
                <span className="font-bold">Phương Thức:</span>{" "}
                {cart.paymentMethod}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Sản Phẩm Đặt Hàng</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              {cart.cartItems.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <img
                    src={item.cover}
                    alt={item.name}
                    className="w-16 h-20 object-cover mr-4"
                  />
                  <div>
                    <Link to={`/books/${item._id}`}>
                      <p className="text-blue-500 hover:underline">
                        {item.name}
                      </p>
                    </Link>
                    <p>
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Tóm Tắt Đơn Hàng</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <p>Sản Phẩm</p>
                <p>${cart.itemsPrice}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Vận Chuyển</p>
                <p>${cart.shippingPrice}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Thuế</p>
                <p>${cart.taxPrice}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="font-bold">Tổng Cộng</p>
                <p className="font-bold">${cart.totalPrice}</p>
              </div>
              <button
                onClick={placeOrderHandler}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
              >
                Đặt Hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
