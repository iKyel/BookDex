import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="bg-white shadow-md rounded-md">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">ITEMS</th>
                  <th className="px-4 py-2">DATE</th>
                  <th className="px-4 py-2">TOTAL</th>
                  <th className="px-4 py-2">PAID</th>
                  <th className="px-4 py-2">DELIVERED</th>

                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-200">
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">
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
                    </td>
                    <td className="px-4 py-2">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="px-4 py-2">${order.totalPrice}</td>
                    <td className="px-4 py-2">
                      {order.isPaid ? (
                        <>
                          {order.paidAt.substring(0, 10)} <br />(
                          {order.paymentMethod})
                        </>
                      ) : (
                        <span className="text-red-500">Not Paid</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <span className="text-red-500">Not Delivered</span>
                      )}
                    </td>

                    <td className="px-4 py-2">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;