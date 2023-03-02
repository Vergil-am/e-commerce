// import { Outlet, Navigate } from "react-router"
import { useSelector } from "react-redux";
import {Navigate, Outlet} from "react-router-dom"

const ProtectedRoute = () => {
    const user = useSelector(state => state.user.currentUser);

    return(
        user.isAdmin ? <Outlet /> : <Navigate to="/login" />
    )

};



export default ProtectedRoute;
