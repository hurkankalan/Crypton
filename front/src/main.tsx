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
import { Unprotected } from "./middlewares/Unprotected.tsx";
import Wallet from "./pages/Wallet/Wallet.tsx";
import Prediction from "./components/Predict/Prediction.tsx"; 
// import "./styles/scss/flex.scss";

/* Routes */


const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <Unprotected>
      <Login />
    </Unprotected>,
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
      {
        path: "wallet",
        element: <Wallet username="CryptoFan123" currencyBalance={42}/>,
      },
      {
        path: "prediction", 
        element: <Prediction />,
      },
    ],
  },
]);



const App: React.FC = () => {
  const [username, setUsername] = useState(" ");
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [bitcoin, setBitcoin] = useState<number>(0);  
  const value = { username, setUsername, setToken,token,role,setRole,balance,setBalance,userId,setUserId ,bitcoin,setBitcoin};

  return (
    <React.StrictMode>
      <MyGlobalContext.Provider value={value}>
        <RouterProvider router={router} />
        <ToastContainer />
      </MyGlobalContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
