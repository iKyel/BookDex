import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../AdminMenu";
import {
  useUploadBookCoverMutation,
  useCreateBookMutation,
} from "../../../redux/api/bookApiSlice";
import { useFetchDemographicsQuery } from "../../../redux/api/demographicsApiSlice";
import { useFetchAuthorsQuery } from "../../../redux/api/authorApiSlice";
import { toast } from "react-toastify";

const BookList = () => {
  const [name, setName] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [author, setAuthor] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [demographic, setDemographic] = useState("");
  const [publisher, setPublisher] = useState("");
  const [number_of_pages, setNumber_of_pages] = useState(0);
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [cover, setCover] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  const [uploadBookCover] = useUploadBookCoverMutation();
  const [createBook] = useCreateBookMutation();
  const { data: demographics } = useFetchDemographicsQuery();
  const { data: authors, refetch} = useFetchAuthorsQuery();

  const [searchedAuthors, setSearchedAuthors] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false); // New state

  useEffect(() => {
    refetch();
  }, [refetch]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

      const { data } = await createBook(bookData);

      if (data.error) {
        toast.error(
          "Thêm sách không thành công do dữ liệu lỗi. Vui lòng thử lại."
        );
      } else {
        toast.success(`${data.name} đã được tạo thành công`);
        navigate("/admin/allbooks");
      }
    } catch (error) {
      console.error(error);
      toast.error("Thêm sách không thành công. Vui lòng thử lại.");
    }
  };
  const uploadFileHandler = async (e) => {
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

  const handleAuthorSearch = (searchQuery) => {
    if (!searchQuery) {
      setSearchedAuthors([]);
      setShowSuggestions(false); // Hide suggestions if search query is empty
      return;
    }
    const filteredAuthors = authors.filter((author) =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchedAuthors(filteredAuthors);
    setShowSuggestions(true); // Show suggestions when there is a search query
  };

  return (
    <div>
      <AdminMenu />
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-lg font-bold mb-4">Thêm Mới Sách</h2>
            {coverUrl && (
              <div className="mb-4">
                <img src={coverUrl} alt="book" className="w-full" />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 cursor-pointer">
                {cover ? (
                  cover.name
                ) : (
                  <span className="text-gray-500">Chọn File</span>
                )}
                <input
                  type="file"
                  name="cover"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Tên Sách
              </label>
              <input
                type="text"
                className="w-full border border-gray-400 rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-bold mb-2" htmlFor="author">
                Tác Giả
              </label>
              <input
                type="text"
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => {
                  handleAuthorSearch(e.target.value);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Tìm kiếm tác giả"
              />
              {showSuggestions && searchedAuthors.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-semibold">Tác giả gợi ý:</p>
                  <ul className="overflow-y-auto max-h-40">
                    {searchedAuthors.map((author) => (
                      <li
                        key={author._id}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors duration-200"
                        onClick={() => {
                          setAuthor(author._id);
                          setAuthorName(author.name);
                          setShowSuggestions(false);
                        }}
                      >
                        {author.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                {authorName && (
                  <div>
                    <div className="px-3 py-2">
                      <label className="block text-sm font-bold mb-2">
                        Tác giả đã chọn:
                      </label>
                      <p className="inline-block border border-gray-400 rounded px-3 py-1">
                        {authorName}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-gray-500 mb-4">
              Không tìm thấy tác giả?{" "}
              <Link
                to="/admin/authorlist"
                className="text-blue-500 hover:underline"
              >
                Tạo ngay!
              </Link>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="author">
                Phân loại
              </label>
              <select
                className="w-full border border-gray-400 rounded px-3 py-2"
                value={demographic.id}
                onChange={(e) => setDemographic(e.target.value)}
              >
                <option value="">Chọn Phân Loại</option>
                {demographics &&
                  demographics.map((demographic) => (
                    <option key={demographic._id} value={demographic._id}>
                      {demographic.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="synopsis"
              >
                Tóm Tắt
              </label>
              <textarea
                className="w-full border border-gray-400 rounded px-3 py-2"
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="publisher"
              >
                Nhà Xuất Bản
              </label>
              <input
                type="text"
                className="w-full border border-gray-400 rounded px-3 py-2"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="number_of_pages"
              >
                Số Trang
              </label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded px-3 py-2"
                value={number_of_pages}
                onChange={(e) => setNumber_of_pages(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="price">
                Giá Tiền
              </label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded px-3 py-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="countInStock"
              >
                Số Lượng Tồn Kho
              </label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded px-3 py-2"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
              >
                Tạo Sách
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookList;
