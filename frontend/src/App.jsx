import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import MainLayout from "./pages/Layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/User/Profile";
import AdminRoute from "./pages/Admin/AdminRoute";
import UserList from "./pages/Admin/UserList";
import DemographicList from "./pages/Admin/Books/Demographic/DemographicList";
import AuthorList from "./pages/Admin/Books/Author/AuthorList";

// Books
import BookList from "./pages/Admin/Books/BookList";
import BookUpdate from "./pages/Admin/Books/BookUpdate";
import AllBooks from "./pages/Admin/Books/AllBooks";
import FavoriteBooks from "./pages/Books/FavoriteBooks";
import BookDetails from "./pages/Books/BookDetails";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Shipping from "./pages/Orders/Shipping";
import PlaceOrder from "./pages/Orders/PlaceOrder";
import Order from "./pages/Orders/Order";
import UserOrders from "./pages/User/UserOrders";
import OrderList from "./pages/Admin/Orders/OrderList";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import Author from "./pages/Books/Author/Author";

const routes = [
  // Các trang không sử dụng MainLayout
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,

  // Các trang sử dụng MainLayout
  <Route key="main" path="/" element={<MainLayout />}>
    <Route path="" element={<PrivateRoute />}>
      <Route index={true} path="/profile" element={<Profile />} />
    </Route>
    <Route key="/home" path="/home" element={<Home />} />
    <Route path="/favorite" element={<FavoriteBooks />} />
    <Route path="/books/:id" element={<BookDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/shipping" element={<Shipping />} />
    <Route path="/place-order" element={<PlaceOrder />} />
    <Route path="/order/:id" element={<Order />} />
    <Route path="/user/orderlist" element={<UserOrders />} />
    <Route path="/books/author/:authorId" element={<Author />} />
    <Route path="/admin" element={<AdminRoute />}>
      <Route path="userlist" element={<UserList />} />
      <Route path="demographiclist" element={<DemographicList />} />
      <Route path="authorlist" element={<AuthorList />} />
      <Route path="addbook" element={<BookList />} />
      <Route path="allbooks" element={<AllBooks />} />
      <Route path="books/update/:bookId" element={<BookUpdate />} />
      <Route path="orderlist" element={<OrderList />} />
      <Route path="dashboard" element={<AdminDashBoard />} />
    </Route>
  </Route>,
];

const router = createBrowserRouter(createRoutesFromChildren(routes));

function App() {
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
