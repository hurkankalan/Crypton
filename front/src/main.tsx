/* React */
import React from "react";

/* React Router Dom */
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Components */
import Home from "./pages/Home";
import MarketTable from "./components/market-tables/MarketTable.tsx";

/* Styles */
import "./styles/scss/app.scss";
import "./styles/scss/_global.scss";

import Container from "./pages/Container/Container.tsx";
import Article from "./components/Article/Article.tsx";
import Login from "./components/Login/Login.tsx"
import Profile from "./pages/Profile/Profile.tsx";
// import "./styles/scss/flex.scss";

/* Routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // AJOUTER LA PAGE QUI ENGLOBE LE LOGIN ET REGISTER ICI
  },
  {
    path: "/home",
    element: <Container />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "markets",
        element: <MarketTable />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path:"profile", 
        element: <Profile/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
