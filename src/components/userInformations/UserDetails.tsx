import { useQuery } from "@tanstack/react-query";

type Props = {
  userId: string | undefined;
};

const UserDetails = ({ userId }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userdetails", userId],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  if (isLoading)
    return <div className="text-center py-4 text-gray-500 animate-pulse">Loading user details...</div>;

  if (isError)
    return <div className="text-center py-4 text-red-500 font-medium">Error loading user details.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2"> User Details</h2>
      {data && (
        <div className="space-y-2 text-gray-700">
          <h3 className="text-xl font-semibold">{data.name}</h3>
          <p>
            <strong>Username:</strong> {data.username}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Phone:</strong> {data.phone}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={`https://${data.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {data.website}
            </a>
          </p>
          <div>
            <h4 className="font-semibold mt-3">Address:</h4>
            <p className="text-sm">
              {data.address.suite}, {data.address.street}, {data.address.city}, {data.address.zipcode}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mt-3">Company:</h4>
            <p className="text-sm">
              <strong>{data.company.name}</strong> — {data.company.catchPhrase}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
