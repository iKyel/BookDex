import {
  FaSearch,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoritesCount from "../pages/Books/components/FavoritesCount";
import CartCount from "../pages/Books/components/CartCount";

import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/usersApiSlice";
import { logout } from "../redux/features/auth/authSlice";

import { useGetFilteredBooksQuery } from "../redux/api/bookApiSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchResults } = useGetFilteredBooksQuery({
    name: searchTerm,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm("");
  };

  const handleBookClick = () => {
    setSearchTerm(""); // Reset searchTerm when a book is clicked
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/home">
            <div className="flex items-center">
              <img
                className="h-8 w-auto mr-2"
                src="https://mangadex.org/img/brand/mangadex-logo.svg"
                alt="BookDex Logo"
              />

              <h1 className="text-lg font-semibold">BookDex</h1>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring focus:border-blue-300 w-full"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="h-5 w-5" />
              </div>
              {searchTerm && (
                <div className="absolute bg-gray-100 border border-gray-300 w-full mt-1 rounded-md z-10 shadow-md">
                  {searchResults.map((book) => (
                    <Link
                      to={`/books/${book._id}`}
                      key={book.id}
                      onClick={handleBookClick}
                    >
                      <div className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer text-gray-800">
                        <>
                          <img
                            src={book.cover}
                            alt={book.name}
                            className="mr-4 h-16"
                          />
                          <div className="flex flex-col justify-center">
                            {" "}
                            <div className="text-center">{book.name}</div>{" "}
                          </div>
                        </>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Utility links */}
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-300 focus:outline-none">
              <FaMapMarkerAlt className="h-5 w-5" />
            </a>
            {!userInfo && (
              <>
                <a
                  href="#"
                  className="hover:text-gray-300 account"
                  onClick={toggleAccount}
                >
                  Account
                </a>
                {/* Dropdown menu */}
                <div className="relative">
                  {isAccountOpen && (
                    <div className="absolute right-0 mt-5 w-36 bg-[#282A36] shadow-lg rounded-md overflow-hidden z-10">
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-white hover:bg-gray-700"
                      >
                        Đăng Nhập
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-white hover:bg-gray-700"
                      >
                        Đăng Ký
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}

            <div>
              <button onClick={toggleMenu}>
                {userInfo ? (
                  <span className="text-white font-bold">{userInfo.username}</span>
                ) : (
                  <></>
                )}

                <div className="relative">
                  {isMenuOpen && userInfo && (
                    <ul className={`${userInfo.isAdmin ? "" : ""}`}>
                      {!userInfo.isAdmin && (
                        <>
                          <div className="absolute right-0 mt-5 w-36 bg-[#282A36] shadow-lg rounded-md overflow-hidden z-10">
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-white hover:bg-gray-700"
                            >
                              Tài Khoản
                            </Link>
                            <Link
                              to="/user/orderlist"
                              className="block px-4 py-2 text-white hover:bg-gray-700"
                            >
                              Đơn Hàng
                            </Link>
                            <Link
                              onClick={logoutHandler} // Chỉ thêm logout handler nếu không phải admin
                              className="block px-4 py-2 text-white hover:bg-gray-700"
                            >
                              Đăng Xuất
                            </Link>
                          </div>
                        </>
                      )}
                      {userInfo.isAdmin && (
                        <>
                          <div className="absolute right-0 mt-5 w-36 bg-[#282A36] shadow-lg rounded-md overflow-hidden z-10">
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-white hover:bg-gray-700"
                            >
                              Tài Khoản
                            </Link>
                            <Link
                              to="/admin/orderlist"
                              className="block px-4 py-2 text-white hover:bg-gray-700"
                            >
                              Đơn Hàng
                            </Link>
                            <Link
                              onClick={logoutHandler}
                              className="block px-4 py-2 text-white hover:bg-gray-700"
                            >
                              Đăng Xuất
                            </Link>
                          </div>
                        </>
                      )}
                    </ul>
                  )}
                </div>
              </button>
            </div>
            <Link to={`/shop`}>
              <a href="#" className="hover:text-gray-300">
                Cửa Hàng
              </a>
            </Link>

            <Link to={`/cart`} className="flex">
              <a href="#" className="hover:text-gray-300">
                <FaShoppingCart className="h-5 w-5" />
              </a>
              <div className="">
                <CartCount />
              </div>
            </Link>
            <Link to={`/favorite`} className="flex">
              <a href="#" className="hover:text-gray-300">
                <FaHeart className="h-5 w-5" />
              </a>
              <div className="">
                <FavoritesCount />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
