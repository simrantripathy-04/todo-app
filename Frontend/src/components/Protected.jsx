
import { Navigate } from "react-router-dom";

export     function Protected({children}){
    if(!localStorage.getItem('login')){
        return <Navigate to='/'  replace />;
    }
    return children;
}