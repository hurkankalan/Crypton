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
import MarketTable from "./components/market-tables/MarketTable.tsx";
import Footer from "./components/Footer/Footer";

/* Styles */
import "./styles/scss/app.scss";
import "./styles/scss/_global.scss";
import "./styles/scss/grid.scss";
import "./styles/scss/helper.scss";
import "./styles/scss/reset.scss";
// import "./styles/scss/flex.scss";

/* Routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,

    children: [
      { index: true, element: <Home /> },
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
    <RouterProvider router={router} />
    <Footer theme="white" />{" "}
    {/* Ajoutez le Footer ici, avec le prop 'theme' selon vos besoins */}
  </React.StrictMode>
);
