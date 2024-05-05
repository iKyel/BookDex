import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateBookMutation, useUploadBookCoverMutation } from "../../redux/api/bookApiSlice";
import { useFetchDemographicsQuery } from "../../redux/api/demographicsApiSlice";
import { useFetchAuthorsQuery } from "../../redux/api/authorApiSlice";
import { toast } from "react-toastify";

const BookList = () => {
    const [cover, setCover] = useState("")
    const [name, setName] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [author, setAuthor] = useState("")
    const [demographic, setDemographic] = useState("")
    const [publisher, setPublisher] = useState("")
    const [number_of_pages, setNumber_of_pages] = useState(0)
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [coverUrl, setCoverUrl] = useState(null)
    const navigate = useNavigate()

    const [uploadBookCover] = useUploadBookCoverMutation()
    const [createBook] = useCreateBookMutation()
    const {data: demographics} = useFetchDemographicsQuery()
    const {data: authors} = useFetchAuthorsQuery()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const BookData = new FormData()
            BookData.append("cover", cover)
            BookData.append("name", name)
            BookData.append("synopsis", synopsis)
            BookData.append("author", author)
            BookData.append("demographic", demographic)
            BookData.append("publisher", publisher)
            BookData.append("number_of_pages", number_of_pages) 
            BookData.append("price", price)
            BookData.append("countInStock", countInStock)

            const {data} = await createBook(BookData)
            if (data.error) {
                toast.error("Tạo sách thất bại do dữ liệu lỗi, vui lòng thử lại.");
              } else {
                toast.success(`${data.name} dã được khởi tạo!`);
                navigate("/");
              }
            } catch (error) {
                console.error(error);
                toast.error("Tạo sách thất bại, vui lòng thử lại.");
              }
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("cover", e.target.files[0]);
    
        try {
          const res = await uploadBookCover(formData).unwrap();
          toast.success(res.message);
          setCover(res.image);
          setCoverUrl(res.image);
        } catch (error) {
          toast.error(error?.data?.message || error.error);
        }
      };
  return (
    <div>
      
    </div>
  )
}

export default BookList
