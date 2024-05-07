import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Messsage variant="danger">{error}</Messsage>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Shipping</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <p>
                <span className="font-bold">Name:</span> {order.user.username}
              </p>
              <p>
                <span className="font-bold">Email:</span>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <span className="font-bold">Address:</span>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Messsage variant="success">
                  Delivered on {order.deliveredAt}
                </Messsage>
              ) : (
                <Messsage variant="danger">Not Delivered</Messsage>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <p>
                <span className="font-bold">Method:</span> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Messsage variant="success">Paid on {order.paidAt}</Messsage>
              ) : (
                <Messsage variant="danger">Not Paid</Messsage>
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Order Items</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center mb-2 border-b border-gray-300 pb-2 last:border-none last:pb-0"
                >
                  <img
                    src={item.cover}
                    alt={item.name}
                    className="w-16 h-20 object-cover mr-4"
                  />
                  <div>
                    <Link to={`/book/${item.book}`}>
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
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <p>Items</p>
                <p>${order.itemsPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Shipping</p>
                <p>${order.shippingPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Tax</p>
                <p>${order.taxPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="font-bold">Total</p>
                <p className="font-bold">${order.totalPrice.toFixed(2)}</p>
              </div>
              {!order.isPaid && (
                <div className="mb-4">
                  {loadingPay && <Loader />}
                  {!isPending && (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </div>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  onClick={deliverHandler}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
                  disabled={loadingDeliver}
                >
                  {loadingDeliver ? "Delivering..." : "Mark as Delivered"}
                </button>
              )}
            </div>
            <div className="flex justify-center py-6">
              <Link
                to="/home"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out"
              >
                Quay về trang chủ
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
