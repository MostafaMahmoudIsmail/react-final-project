import { useQuery } from "@tanstack/react-query";

type Props = {
    userId: string | undefined;
}

const UserPosts = ({userId}: Props)  => {
    const {data, isLoading, isError} = useQuery(
        {
            queryKey: ["userposts"],
            queryFn: async () => {
                const res = await fetch(`https://jsonplaceholder.typicode.com/user/${userId}/posts`)
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
        <div>
            {data.map((post: { id: number; title: string; body: string }) => (
            <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
            ))}
        </div>
        </>
    )
}

export default UserPosts;