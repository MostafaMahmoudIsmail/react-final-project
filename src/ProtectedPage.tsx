import { Navigate, Outlet } from "react-router";



const ProtectedPage = () => {
    const token = localStorage.getItem("auth_token")
    if (token){
        return <Outlet/>
    }
    return <Navigate to="/login" replace/>
}


export default ProtectedPage;