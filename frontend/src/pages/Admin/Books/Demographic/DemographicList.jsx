import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";
import AdminMenu from "../../AdminMenu";
import {
  useCreateDemographicMutation,
  useDeleteDemographicMutation,
  useFetchDemographicsQuery,
  useUpdateDemographicMutation,
} from "../../../../redux/api/demographicsApiSlice";
import { toast } from "react-toastify";

const DemographicList = () => {
  const {
    data: demographics,
    refetch,
    isLoading,
    error,
  } = useFetchDemographicsQuery();
  const [name, setName] = useState("");

  const [createDemographic] = useCreateDemographicMutation();
  const [deleteDemographic] = useDeleteDemographicMutation();
  const [updateDemographic] = useUpdateDemographicMutation();

  const [editableDemographicId, setEditableDemographicId] = useState(null);
  const [editableDemographicName, setEditableDemographicName] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);
  const handleCreateDemographic = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Tên Demographic là bắt buộc");
      return;
    }

    try {
      const result = await createDemographic({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} đã được tạo.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Tạo Demographic thất bại, vui lòng thử lại.");
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phân loại này không?")) {
      try {
        await deleteDemographic(id);
        toast.success("Phân loại đã được xóa thành công!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, name) => {
    setEditableDemographicId(id);
    setEditableDemographicName(name);
  };

  const updateHandler = async (id) => {
    try {
      await updateDemographic({
        demographicId: id,
        updatedDemographic: {
          name: editableDemographicName,
        },
      });
      setEditableDemographicId(null);
      toast.success("Phân loại đã được cập nhật thành công");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <AdminMenu />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Danh sách phân loại</h1>
        <form onSubmit={handleCreateDemographic} className="mb-4">
          <input
            type="text"
            placeholder="Nhập tên Demographic mới"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md px-4 py-2 mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
          >
            Thêm
          </button>
        </form>
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
                    Tên phân loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {demographics.map((demographic) => (
                  <tr key={demographic.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {demographic._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editableDemographicId === demographic._id ? (
                        <input
                          type="text"
                          className="border rounded-md px-2 py-1"
                          value={editableDemographicName}
                          onChange={(e) =>
                            setEditableDemographicName(e.target.value)
                          }
                        />
                      ) : (
                        demographic.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {editableDemographicId === demographic._id ? (
                        <>
                          <div className="flex space-x-2">
                            <FaCheck
                              className="text-green-500 cursor-pointer"
                              onClick={() => updateHandler(demographic._id)}
                            />
                            <FaTimes
                              className="text-red-500 cursor-pointer"
                              onClick={() => setEditableDemographicId(null)}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex space-x-2">
                            <FaEdit
                              className="text-blue-500 cursor-pointer"
                              onClick={() =>
                                toggleEdit(demographic._id, demographic.name)
                              }
                            />
                            <FaTrash
                              className="text-red-500 cursor-pointer"
                              onClick={() => deleteHandler(demographic._id)}
                            />
                          </div>
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

export default DemographicList;
