import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminMenu from "../AdminMenu";
import {
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useUploadBookCoverMutation,
} from "../../../redux/api/bookApiSlice";
import { useFetchAuthorsQuery } from "../../../redux/api/authorApiSlice";
import { useFetchDemographicsQuery } from "../../../redux/api/demographicsApiSlice";
import { toast } from "react-toastify";

const BookUpdate = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data: book, refetch } = useGetBookByIdQuery(bookId);

  const [updateBook, { isLoading: updatingBook }] = useUpdateBookMutation();
  const [deleteBook, { isLoading: deletingBook }] = useDeleteBookMutation();
  const [uploadBookCover, { isLoading: uploadingCover }] =
    useUploadBookCoverMutation();

  const { data: authors } = useFetchAuthorsQuery();
  const { data: demographics } = useFetchDemographicsQuery();

  const [name, setName] = useState(book?.name || "");
  const [synopsis, setSynopsis] = useState(book?.synopsis || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [demographic, setDemographic] = useState(book?.demographic || "");
  const [publisher, setPublisher] = useState(book?.publisher || "");
  const [number_of_pages, setNumber_of_pages] = useState(0);
  const [price, setPrice] = useState(book?.price || 0);
  const [countInStock, setCountInStock] = useState(book?.countInStock || 0);
  const [cover, setCover] = useState(book?.cover || "");
  const [coverUrl, setCoverUrl] = useState(book?.coverUrl || "");

  useEffect(() => {
    if (book && book._id) {
      setName(book.name);
      setSynopsis(book.synopsis);
      setAuthor(book.author);
      setDemographic(book.demographic);
      setPublisher(book.publisher);
      setNumber_of_pages(book.number_of_pages);
      setPrice(book.price);
      setCountInStock(book.countInStock);
      setCover(book.cover);
      setCoverUrl(book.coverUrl);
    }
    refetch();
  }, [book, refetch]);

  const handleCoverChange = async (e) => {
    const formData = new FormData();
    formData.append("cover", e.target.files[0]);

    try {
      const res = await uploadBookCover(formData).unwrap();
      setCover(res.cover);
      setCoverUrl(res.cover);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const bookData = {
        name: name,
        synopsis: synopsis,
        author: author,
        demographic: demographic,
        publisher: publisher,
        number_of_pages: number_of_pages,
        price: price,
        countInStock: countInStock,
        cover: cover,
      };

      const { data } = await updateBook({
        bookId: bookId,
        updatedBook: bookData,
      });

      if (data.error) {
        toast.error(
          "Sửa sách không thành công do dữ liệu lỗi. Vui lòng thử lại."
        );
      } else {
        toast.success(`${data.name} đã được sửa thành công`);
        // Redirect or handle success action here
      }
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Thêm sách không thành công. Vui lòng thử lại.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBook(bookId).unwrap();
      toast.success("Xóa sách thành công!");
      navigate("/admin/allbooks");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div>
      <AdminMenu />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Cập nhật sách</h1>
        <form
          onSubmit={handleUpdate}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Tên sách
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên sách"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="synopsis"
              className="block text-gray-700 font-bold mb-2"
            >
              Tóm tắt nội dung
            </label>
            <textarea
              id="synopsis"
              name="synopsis"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Tóm tắt nội dung"
              rows={7}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 font-bold mb-2"
            >
              Tác giả
            </label>
            <select
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value=""></option>
              {authors?.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
            <div className="text-gray-500 mt-2">
              Không tìm thấy tác giả?{" "}
              <Link
                to="/admin/authorlist"
                className="text-blue-500 hover:underline"
              >
                Tạo ngay!
              </Link>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="cover"
              className="block text-gray-700 font-bold mb-2"
            >
              Ảnh bìa
            </label>
            <img
              src={cover}
              alt={name}
              className="w-full h-auto object-cover"
              style={{ maxHeight: "500px", maxWidth: "400px" }} // Đặt chiều cao tối đa là 300px
            />
            <input
              type="file"
              id="cover"
              name="cover"
              onChange={handleCoverChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="demographic"
              className="block text-gray-700 font-bold mb-2"
            >
              Phân loại
            </label>
            <select
              id="demographic"
              name="demographic"
              value={demographic}
              onChange={(e) => setDemographic(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value=""></option>
              {demographics?.map((demographic) => (
                <option key={demographic._id} value={demographic._id}>
                  {demographic.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="publisher"
              className="block text-gray-700 font-bold mb-2"
            >
              Nhà xuất bản
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              placeholder="Nhà xuất bản"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="number_of_pages"
              className="block text-gray-700 font-bold mb-2"
            >
              Số trang
            </label>
            <input
              type="number"
              id="number_of_pages"
              name="number_of_pages"
              value={number_of_pages}
              onChange={(e) => setNumber_of_pages(e.target.value)}
              placeholder="Số trang"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Giá
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Giá"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="countInStock"
              className="block text-gray-700 font-bold mb-2"
            >
              Số lượng tồn kho
            </label>
            <input
              type="number"
              id="countInStock"
              name="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              placeholder="Số lượng tồn kho"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={updatingBook || uploadingCover}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {updatingBook || uploadingCover ? "Loading..." : "Cập nhật"}
            </button>
            <button
              type="button"
              disabled={deletingBook}
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {deletingBook ? "Loading..." : "Xóa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BookUpdate;
