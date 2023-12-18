import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Api from "../components/api/auth.api";
import { jwtDecode } from "jwt-decode";

type Props = {
    children: JSX.Element;
};

const Protected: React.FC<Props> = ({ children }) => {
    const [cookies] = useCookies(["token"]);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        console.log(cookies.token);

        if (cookies.token) {
            const decodedToken = jwtDecode(cookies.token);
            console.log(decodedToken);
            setToken(cookies.token);
            Api.defaults.headers.common["jwt"] = cookies.token;
        } else {
            setToken(null);
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
