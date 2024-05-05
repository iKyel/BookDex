import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from "./pages/Layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Profile from "./pages/User/Profile";
import AdminRoute from "./pages/Admin/AdminRoute"
import UserList from "./pages/Admin/UserList";
import DemographicList from "./pages/Admin/Books/Demographic/DemographicList";
import AuthorList from "./pages/Admin/Books/Author/AuthorList";

// Books
import BookList from "./pages/Admin/Books/BookList";
import BookUpdate from "./pages/Admin/Books/BookUpdate";
import AllBooks from "./pages/Admin/Books/AllBooks";

const routes = [
  // Các trang không sử dụng MainLayout
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,

  // Các trang sử dụng MainLayout
  <Route key="main" path="/" element={<MainLayout />}>
    <Route path="" element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
    </Route>
    <Route key="/home" path="/home" element={<Home />} />
    <Route path='/admin' element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />}/>
        <Route path="demographiclist" element={<DemographicList />}/>
        <Route path="authorlist" element={<AuthorList />}/>
        <Route path="addbook" element={<BookList />}/>
        <Route path="allbooks" element={<AllBooks />}/>
        <Route path="books/:bookId" element={<BookUpdate />}/>
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
