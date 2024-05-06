import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import AdminMenu from "./AdminMenu";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      try {
        await deleteUser(id);
        toast.success("Người dùng đã được xóa thành công");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      toast.success("Người dùng đã được cập nhật thành công");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <AdminMenu />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên người dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editableUserId === user._id ? (
                        <input
                          type="text"
                          className="border rounded-md px-2 py-1"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editableUserId === user._id ? (
                        <input
                          type="email"
                          className="border rounded-md px-2 py-1"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isAdmin ? "Có" : "Không"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {user.isAdmin ? (
                        <></>
                      ) : (
                        <>
                          {editableUserId === user._id ? (
                            <>
                              <div className="flex space-x-2">
                                <FaCheck
                                  className="text-green-500 cursor-pointer"
                                  onClick={() => updateHandler(user._id)}
                                />
                                <FaTimes
                                  className="text-red-500 cursor-pointer"
                                  onClick={() => setEditableUserId(null)}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex space-x-2">
                                <FaEdit
                                  className="text-blue-500 cursor-pointer"
                                  onClick={() =>
                                    toggleEdit(
                                      user._id,
                                      user.username,
                                      user.email
                                    )
                                  }
                                />
                                <FaTrash
                                  className="text-red-500 cursor-pointer"
                                  onClick={() => deleteHandler(user._id)}
                                />
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
