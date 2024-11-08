import { useGetTopCustomersQuery } from "../redux/api/orderApiSlice";

const TopCustomers = () => {
  const { data, isLoading, error } = useGetTopCustomersQuery();

  return (
    <div className="max-w-7xl mx-auto">
      {isLoading ? (
        <p className="text-center mt-8">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-8">Error: {error.data?.message}</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Khách hàng</th>
              <th className="px-4 py-2">Số đơn hàng</th>
              <th className="px-4 py-2">Tổng chi tiêu</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => (
              <tr key={customer.user._id}>
                <td className="border px-4 py-2">{customer.user.username}</td>
                <td className="border px-4 py-2">{customer.totalOrders}</td>
                <td className="border px-4 py-2">${customer.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopCustomers;
