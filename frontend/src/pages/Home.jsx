import AdminMenu from "./Admin/AdminMenu";
import Header from "../components/Header";
import TopBooks from "./Books/TopBooks";
import { Link } from "react-router-dom";
import TopSellingBooks from "./Books/Orders/TopSellingBooks";

const Home = () => {
  return (
    <div className="mb-4">
      <AdminMenu />
      <Header />
      <TopBooks />
      <Link to={"/shop"}>
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Xem Tất Cả
          </button>
        </div>
      </Link>
      <TopSellingBooks />
    </div>
  );
};

export default Home;
