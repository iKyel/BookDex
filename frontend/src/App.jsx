import React from "react";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";

// Layouts
import MainLayout from "./pages/Layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";

const routes = [
  // Các trang không sử dụng MainLayout
  <Route key="login" path="/login" element={<Login />} />,

  // Các trang sử dụng MainLayout
  <Route key="main" path="/" element={<MainLayout />}>
    <Route key="home" path="/" element={<Home />} />
  </Route>,
];

const router = createBrowserRouter(createRoutesFromChildren(routes));

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
