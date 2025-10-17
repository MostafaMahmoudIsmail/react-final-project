import { useQuery } from "@tanstack/react-query";

type Props = {
    userId: string | undefined;
}

const UserDetails = ({userId}: Props) => {
    const {data, isLoading, isError} = useQuery(
        {
            queryKey: ["userdetails"],
            queryFn: async () => {
                const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
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
            <h2>User Details : </h2>
            {data && (
                <div>
                    <h3>{data.name}</h3>
                    <p><strong>Username:</strong> {data.username}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Phone:</strong> {data.phone}</p>
                    <p><strong>Website:</strong> <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer">{data.website}</a></p>
                    <h4>Address:</h4>
                    <p>{data.address.suite}, {data.address.street}, {data.address.city}, {data.address.zipcode}</p>
                    <h4>Company:</h4>
                    <p><strong>{data.company.name}</strong> - {data.company.catchPhrase}</p>
                </div>
            )}
        </>
    )
    
}

export default UserDetails;