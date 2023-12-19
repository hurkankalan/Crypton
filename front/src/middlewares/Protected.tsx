import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Api from "../components/api/auth.api";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useGlobalContext } from "../context/context";

export type Props = {
    children: JSX.Element;
};

interface MyTokenPayload extends JwtPayload {
    id: number;
    username: string;
    role: string;
    currency: string;
}

const Protected: React.FC<Props> = ({ children }) => {
    const [cookies] = useCookies(["token"]);
    const [isLoading, setIsLoading] = useState(true);
    const { setUsername,setToken,token } = useGlobalContext();


    useEffect(() => {

        if (cookies.token) {
            const decodedToken = jwtDecode<MyTokenPayload>(cookies.token);
            setUsername(decodedToken.username);
            setToken(cookies.token);
            Api.defaults.headers.common["jwt"] = cookies.token;
        } else {
            setToken("");
        }
        setIsLoading(false);
    }, [cookies]);

    if (isLoading) {
        return null; // on peut rajouter un spinner au cas ou ça prend longtemps
    }

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
};

export default Protected;
