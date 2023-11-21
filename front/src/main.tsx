/* React */
import React from "react";

/* React Router Dom */
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Components */
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer/Footer"; // Assurez-vous que le chemin est correct

/* Styles */
import "./styles/scss/app.scss";

/* Routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Footer theme="white" />{" "}
    {/* Ajoutez le Footer ici, avec le prop 'theme' selon vos besoins */}
  </React.StrictMode>
);
