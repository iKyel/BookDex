import Message from "../../../components/Message";
import { useEffect } from "react";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../../redux/api/orderApiSlice";
import AdminMenu from "../AdminMenu";

const OrderList = () => {
  const { data: orders, refetch, isLoading, error } = useGetOrdersQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
    <AdminMenu />
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Đơn Hàng</h1>
      </div>
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
                  <th className="px-4 py-2">NGƯỜI DÙNG</th>
                  <th className="px-4 py-2">NGÀY</th>
                  <th className="px-4 py-2">TỔNG</th>
                  <th className="px-4 py-2">ĐÃ THANH TOÁN</th>
                  <th className="px-4 py-2">ĐÃ GIAO</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-200">
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">{order.user.username}</td>
                    <td className="px-4 py-2">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="px-4 py-2">{order.totalPrice}đ</td>
                    <td className="px-4 py-2">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <span className="text-red-500">Chưa Thanh Toán</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <span className="text-red-500">Chưa Giao</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md mr-2"
                      >
                        Chi Tiết
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
    </>
    
  );
};

export default OrderList;
