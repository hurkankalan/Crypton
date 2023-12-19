import { Navigate } from "react-router-dom";
import { Props } from "./Protected"
import { useGlobalContext } from "../context/context";
import { useCookies } from "react-cookie";



export const Unprotected: React.FC<Props> =({children}) => { 
    const [cookies] = useCookies(["token"]);
    const {token , setToken , role} = useGlobalContext();

    if (cookies.token) {
        setToken(cookies.token);
    } else {    
        setToken("");
    }

    if (token && role !== "guest") {
        return <Navigate to="/home" />;
    }

    return children;
}