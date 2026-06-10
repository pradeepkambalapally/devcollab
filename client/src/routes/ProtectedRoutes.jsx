
import {Navigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoutes = ({children}) => {
    const {token} = useAuth();
    if(!token){
        return <Navigate to="/login" /> 
    }
    return children;
}

export default ProtectedRoutes;