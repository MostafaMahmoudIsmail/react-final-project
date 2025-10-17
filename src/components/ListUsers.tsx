import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";


const ListUsers = () => {

    const navigate = useNavigate();
    const {data, isLoading, isError} = useQuery(
        {
            queryKey: ["users"],
            queryFn: async () => {
                const res = await fetch("https://jsonplaceholder.typicode.com/users")
                if (!res.ok){
                    throw new Error("Network response was not ok")
                }
                return res.json();
            }
        }
    )

    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return <div>Error loading users.</div>
    }

    return (
        <>
        <h2>All Users : </h2>
        <ul>
            {data.map((user: any) => (
                <li key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
                    {user.name} ({user.email})
                </li>
            ))}
        </ul>
        </>
    )
}

export default ListUsers;