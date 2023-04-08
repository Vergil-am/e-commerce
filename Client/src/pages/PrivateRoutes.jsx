// import { Outlet, Navigate } from "react-router"
import {Navigate, Outlet, useNavigate} from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
const ProtectedRoute = () => {
  const {isAuthenticated, loginWithRedirect } = useAuth0()
  if (!isAuthenticated) {
    loginWithRedirect()
  } else {
    return(
       <Outlet />
    )
  }
    

};



export default ProtectedRoute;
