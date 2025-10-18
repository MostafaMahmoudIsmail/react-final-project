import { useQuery } from "@tanstack/react-query";

type Props = {
  userId: string | undefined;
};

const UserToDo = ({ userId }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["usertodo", userId],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  if (isLoading)
    return <div className="text-center py-4 text-gray-500 animate-pulse">Loading to-dos...</div>;

  if (isError)
    return <div className="text-center py-4 text-red-500 font-medium">Error loading to-dos.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">✅ User To-Dos</h2>
      <ul className="space-y-2">
        {data.map((todo: { id: number; title: string; completed: boolean }) => (
          <li
            key={todo.id}
            className={`p-3 rounded border flex justify-between items-center ${
              todo.completed
                ? "bg-green-50 border-green-300 line-through text-gray-500"
                : "bg-gray-50 border-gray-200 hover:bg-yellow-50"
            }`}
          >
            <span>{todo.title}</span>
            {todo.completed ? (
              <span className="text-green-600 font-semibold text-sm"> Done</span>
            ) : (
              <span className="text-yellow-500 font-semibold text-sm"> Pending</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserToDo;
