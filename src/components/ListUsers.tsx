import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const ListUsers = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-6 text-gray-500 animate-pulse">
        Loading users...
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-6 text-red-500 font-medium">
        Error loading users.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
         All Users
      </h2>

      <ul className="space-y-3">
        {data.map((user: any) => (
          <li
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
            className="flex justify-between items-center border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-blue-50 hover:shadow transition-all duration-200"
          >
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <span className="text-blue-500 font-medium text-sm hover:underline">
              View →
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
