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
import MarketTable from './components/market-tables/MarketTable.tsx';

/* Styles */
import "./styles/scss/app.scss"

/* Routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,

    children: [
      {index : true , element : <Home/>},
      {
        path: "/Markets",
        element: <MarketTable />,
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
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
