import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo && userInfo.isAdmin && (
        <div className="top-0 left-0 w-full z-50">
          <div className="bg-gray-800 px-10 py-2 flex justify-between items-center">
            <div className="text-white font-bold text-xl">Admin Menu</div>
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="bg-white shadow-md py-4">
              <nav>
                <ul className="space-y-2">
                  <li>
                    <NavLink
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-300"
                      activeClassName="bg-yellow-500 text-white font-semibold"
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/allbooks"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-300"
                      activeClassName="bg-yellow-500 text-white font-semibold"
                    >
                      Tất Cả Sách
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/addbook"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-300"
                      activeClassName="bg-yellow-500 text-white font-semibold"
                    >
                      Thêm Mới Sách
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/demographiclist"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-300"
                      activeClassName="bg-yellow-500 text-white font-semibold"
                    >
                      Quản Lý Phân Loại
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/authorlist"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-300"
                      activeClassName="bg-yellow-500 text-white font-semibold"
                    >
                      Quản Lý Tác Giả
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/userlist"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-300"
                      activeClassName="bg-yellow-500 text-white font-semibold"
                    >
                      Quản Lý Người Dùng
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/orderlist"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-300"
                      activeClassName="bg-yellow-500 text-white font-semibold"
                    >
                      Quản Lý Đơn Hàng
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdminMenu;
