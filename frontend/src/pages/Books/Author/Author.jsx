import { useGetBookByAuthorIdQuery } from "../../../redux/api/bookApiSlice";
import { useFetchAuthorDetailsQuery } from "../../../redux/api/authorApiSlice";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Books from "../Books";
const Author = () => {
  const { authorId: authorId } = useParams();
  const [authorName, setAuthorName] = useState("");
  const { data: author } = useFetchAuthorDetailsQuery(authorId);
  const {
    data: authorBooks,
    refetch,
    isLoadingAuthorBooks,
  } = useGetBookByAuthorIdQuery(authorId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (author) {
      setAuthorName(author.name);
    }
  }, [author]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mt-10 mb-4">
          {`Sách của tác giả ${authorName}`}
        </h2>
        {isLoadingAuthorBooks ? (
          <p>Đang tải...</p>
        ) : authorBooks ? (
          <Books books={authorBooks} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Author;
