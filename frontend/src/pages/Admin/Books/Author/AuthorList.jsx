import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";
import AdminMenu from "../../AdminMenu";
import {
  useCreateAuthorMutation,
  useDeleteAuthorMutation,
  useFetchAuthorsQuery,
  useUpdateAuthorMutation,
} from "../../../../redux/api/authorApiSlice";
import { toast } from "react-toastify";

const AuthorList = () => {
  const { data: authors, refetch, isLoading, error } = useFetchAuthorsQuery();
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("No Biography");
  const [whereToFind, setWhereToFind] = useState([]);

  const [createAuthor] = useCreateAuthorMutation();
  const [deleteAuthor] = useDeleteAuthorMutation();
  const [updateAuthor] = useUpdateAuthorMutation();

  const [editableAuthorId, setEditableAuthorId] = useState(null);
  const [editableAuthorName, setEditableAuthorName] = useState("");
  const [editableAuthorBiography, setEditableAuthorBiography] = useState("");
  const [editableAuthorWhereToFind, setEditableAuthorWhereToFind] = useState(
    []
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCreateAuthor = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Tên tác giả là bắt buộc");
      return;
    }

    try {
      const result = await createAuthor({
        name,
        biography,
        whereToFind,
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        setBiography("No Biography");
        setWhereToFind([]);
        toast.success(`${result.name} đã được tạo.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Tạo tác giả thất bại, vui lòng thử lại.");
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tác giả này không?")) {
      try {
        await deleteAuthor(id);
        toast.success("Tác giả đã được xóa thành công!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, author) => {
    setEditableAuthorId(id);
    setEditableAuthorName(author.name);
    setEditableAuthorBiography(author.biography);
    setEditableAuthorWhereToFind(author.whereToFind);
  };

  const updateHandler = async (id) => {
    try {
      await updateAuthor({
        authorId: id,
        updatedAuthor: {
          name: editableAuthorName,
          biography: editableAuthorBiography,
          whereToFind: editableAuthorWhereToFind,
        },
      });
      setEditableAuthorId(null);
      toast.success("Tác giả đã được cập nhật thành công");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <AdminMenu />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Danh sách tác giả</h1>
        <form onSubmit={handleCreateAuthor} className="mb-4">
          <div className="mb-2">
            <label htmlFor="name" className="block font-medium text-gray-700">
              Tên tác giả
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nhập tên tác giả mới"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="biography"
              className="block font-medium text-gray-700"
            >
              Tiểu sử
            </label>
            <textarea
              id="biography"
              placeholder="Nhập tiểu sử tác giả"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="whereToFind"
              className="block font-medium text-gray-700"
            >
              Liên Kết
            </label>
            <input
              type="text"
              id="whereToFind"
              placeholder="Nhập nơi có thể tìm thấy tác giả"
              value={whereToFind.join(", ")}
              onChange={(e) =>
                setWhereToFind(
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
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
                    Tên tác giả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiểu sử
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liên Kết
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {authors.map((author) => (
                  <tr key={author._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {author._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editableAuthorId === author._id ? (
                        <input
                          type="text"
                          className="border rounded-md px-2 py-1"
                          value={editableAuthorName}
                          onChange={(e) =>
                            setEditableAuthorName(e.target.value)
                          }
                        />
                      ) : (
                        author.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editableAuthorId === author._id ? (
                        <textarea
                          className="border rounded-md px-2 py-1 w-full"
                          value={editableAuthorBiography}
                          onChange={(e) =>
                            setEditableAuthorBiography(e.target.value)
                          }
                        ></textarea>
                      ) : author.biography.length > 50 ? (
                        `${author.biography.substring(0, 50)}...`
                      ) : (
                        author.biography
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editableAuthorId === author._id ? (
                        <input
                          type="text"
                          className="border rounded-md px-2 py-1 w-full"
                          value={editableAuthorWhereToFind.join(", ")}
                          onChange={(e) =>
                            setEditableAuthorWhereToFind(
                              e.target.value
                                .split(",")
                                .map((item) => item.trim())
                            )
                          }
                        />
                      ) : (
                        author.whereToFind.join(", ")
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {editableAuthorId === author._id ? (
                        <>
                          <div className="flex space-x-2">
                            <FaCheck
                              className="text-green-500 cursor-pointer"
                              onClick={() => updateHandler(author._id)}
                            />
                            <FaTimes
                              className="text-red-500 cursor-pointer"
                              onClick={() => setEditableAuthorId(null)}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex space-x-2">
                            <FaEdit
                              className="text-blue-500 cursor-pointer"
                              onClick={() => toggleEdit(author._id, author)}
                            />
                            <FaTrash
                              className="text-red-500 cursor-pointer"
                              onClick={() => deleteHandler(author._id)}
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

export default AuthorList;
