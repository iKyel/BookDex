import { useState, useEffect } from "react";
import { useGetNewBooksQuery } from "../redux/api/bookApiSlice";
import { useFetchAuthorDetailsQuery } from "../redux/api/authorApiSlice";
import { useFetchDemographicDetailsQuery } from "../redux/api/demographicsApiSlice";
import { Link } from "react-router-dom";
import HeartIcon from "../pages/Books/components/HeartIcon";
import moment from "moment";
const Header = () => {
  const { data: newBooks, isLoading } = useGetNewBooksQuery();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [authorName, setAuthorName] = useState([]);
  const [demographicName, setDemographicName] = useState([]);

  const { data: authorData } = useFetchAuthorDetailsQuery(
    newBooks && newBooks[currentIndex].author
  );
  const { data: demographicData } = useFetchDemographicDetailsQuery(
    newBooks && newBooks[currentIndex]?.demographic
  );
  useEffect(() => {
    if (authorData) {
      setAuthorName(authorData.name);
    }
  }, [authorData]);

  useEffect(() => {
    if (demographicData) {
      setDemographicName(demographicData.name);
    }
  }, [demographicData]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newBooks.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === newBooks.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <header className="bg-gray-700 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col ">
        <h2 className="text-white text-2xl font-semibold font-sans mb-4">
          Sách Mới
        </h2>
        <div className="flex items-center justify-between">
          {isLoading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <div className="flex items-center">
              <img
                src={newBooks[currentIndex].cover}
                alt={newBooks[currentIndex].name}
                className="w-48 h-64 object-cover rounded-lg shadow-md"
              />
              <div className="ml-4 flex flex-col justify-between">
                <div className="mb-2">
                  <div className="flex items-center">
                    <Link to={`/books/${newBooks[currentIndex]._id}`}>
                      <h2 className="text-2xl font-semibold text-white">
                        {newBooks[currentIndex].name}
                      </h2>
                    </Link>
                    <div className="ml-2 text-white">
                      <HeartIcon book={newBooks[currentIndex]} />
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm">{demographicName}</p>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-400 fill-current pr-1"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0l2.47 6.387L20 7.35l-5.73 5.47 1.428 6.567L10 15.8l-5.697 3.587L5.73 12.82 0 7.35l7.53-.963z" />
                    </svg>
                    <p className="text-gray-400 text-sm mr-2">
                      {newBooks[currentIndex].rating}
                    </p>
                  </div>
                </div>
                <div className="">
                  <p className="text-gray-300 mb-2">
                    {newBooks[currentIndex].synopsis}
                  </p>
                </div>
                <div className="">
                  <p className="text-gray-500 mb-2 italic">
                    {moment(newBooks[currentIndex].createdAt).fromNow()}
                  </p>
                </div>
                <div className="mt-auto flex justify-between">
                  <p className="text-gray-300 mb-2 italic">{authorName}</p>
                  <div>
                    <button
                      onClick={handlePrevClick}
                      className="text-white hover:text-gray-300 focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>
                    <button
                      onClick={handleNextClick}
                      className="text-white hover:text-gray-300 focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
