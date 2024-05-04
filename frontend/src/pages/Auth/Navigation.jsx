import { FaSearch, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  useLoginMutation,
  useLogoutMutation,
} from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {};

  const toggleAccount = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="h-8 w-auto mr-2"
              src="https://mangadex.org/img/brand/mangadex-logo.svg"
              alt="BookDex Logo"
            />
            <h1 className="text-lg font-semibold">BookDex</h1>
          </div>

          {/* Search bar */}
          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring focus:border-blue-300 w-full"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Utility links */}
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-300 focus:outline-none">
              <FaMapMarkerAlt className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300" onClick={toggleAccount}>
              Account
            </a>
            {/* Dropdown menu */}
            <div className="relative">
              {isMenuOpen && (
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
            <a href="#" className="hover:text-gray-300">
              Orders
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaShoppingCart className="h-5 w-5" />
            </a>

            <div>
              <button onClick={toggleDropdown}>
                {userInfo ? (
                  <span className="text-white">{userInfo.username}</span>
                ) : (
                  <></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;