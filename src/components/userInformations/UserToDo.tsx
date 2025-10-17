import { useQuery } from "@tanstack/react-query";

type Props = {
    userId: string | undefined;
}


const UserToDo = ({userId}: Props) => {
    
    const {data, isLoading, isError} = useQuery(
        {
            queryKey: ["usertodo"],
            queryFn: async () => {
                const res = await fetch(`https://jsonplaceholder.typicode.com/user/${userId}/todos`)
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
            <ul>
                {data.map((todo: { id: number; title: string; completed: boolean }) => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.title}
                    </li>
                ))}
            </ul>
        </> 
    )
}


export default UserToDo;