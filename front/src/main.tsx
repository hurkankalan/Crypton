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
    element: <div></div>, // AJOUTER LA PAGE QUI ENGLOBE LE LOGIN ET REGISTER ICI 
  },
  {
    path: "/home",
    element: <Navbar />, // AJOUTER LA PAGE QUI ENGLOBE LA NAVBAR ET ET LE FOOTERICI
    children: [
      { index: true, element: <Home /> },
      {
        path: "markets",
        element: <MarketTable />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
