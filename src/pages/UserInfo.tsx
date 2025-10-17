import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import UserDetails from "../components/userInformations/UserDetails";
import UserPosts from "../components/userInformations/UserPosts";
import UserToDo from "../components/userInformations/UserToDo";


const UserInfo = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    
   return (
    <>
        <UserDetails userId={id}/>
        <UserPosts userId={id}/>
        <UserToDo userId={id}/>
    </>
   )

    
}

export default UserInfo;