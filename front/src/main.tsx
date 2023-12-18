/* React */
import React, { useState } from "react";

/* React Router Dom */
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MyGlobalContext } from './context/context.ts'

/* Components */
import Home from "./pages/Home";
import MarketTable from "./components/market-tables/MarketTable.tsx";
import { ToastContainer } from "react-toastify";

/* Styles */
import "./styles/scss/app.scss";
import "./styles/scss/_global.scss";
import "react-toastify/dist/ReactToastify.css";
import Container from "./pages/Container/Container.tsx";
import Article from "./components/Article/Article.tsx";
import Login from "./components/Login/Login.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Protected from "./middlewares/Protected.tsx";
// import "./styles/scss/flex.scss";

/* Routes */


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // AJOUTER LA PAGE QUI ENGLOBE LE LOGIN ET REGISTER ICI
  },
  {
    path: "/home",
    element:
      <Protected>
        <Container />
      </Protected>,
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
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

const App: React.FC = () => {
  const [username, setUsername] = useState("hello");

  return (
    <React.StrictMode>
      <MyGlobalContext.Provider value={{ username, setUsername }}>
        <RouterProvider router={router} />
        <ToastContainer />
      </MyGlobalContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
