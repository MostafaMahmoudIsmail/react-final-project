import { useContext } from "react";
import {UserContext} from "../tools/UserContext";
import ListUsers from "../components/ListUsers";

const DashboardPage = () => {
    
    const {userLogin, setUserLogin} = useContext(UserContext) as {
        userLogin: string,
        setUserLogin: (user: string) => void
    };

    return (
        <>
        <h1>Dashboard Page - Protected</h1>
        <h1> the user is : {userLogin}</h1>
        <ListUsers/>
        </>
        
    )
}

export default DashboardPage;