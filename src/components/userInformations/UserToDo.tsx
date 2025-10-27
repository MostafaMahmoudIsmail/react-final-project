import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Props = {
  userId: string | undefined;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const UserToDo = ({ userId }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["usertodo", userId],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/todos`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!userId,
  });

  // 🧱 state محلي نشتغل عليه
  const [todos, setTodos] = useState<Todo[]>([]);

  // لما تيجي الداتا أول مرة، نخزنها في state
  useEffect(() => {
    if (data) setTodos(data);
  }, [data]);

  // 🌀 وظيفة لتبديل الحالة
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (isLoading)
    return (
      <div className="text-center py-4 text-gray-500 animate-pulse">
        Loading to-dos...
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-4 text-red-500 font-medium">
        Error loading to-dos.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        ✅ User To-Dos
      </h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`p-3 rounded border flex justify-between items-center ${
              todo.completed
                ? "bg-green-50 border-green-300 line-through text-gray-500"
                : "bg-gray-50 border-gray-200 hover:bg-yellow-50"
            }`}
          >
            <span>{todo.title}</span>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold ${
                  todo.completed ? "text-green-600" : "text-yellow-500"
                }`}
              >
                {todo.completed ? "Done" : "Pending"}
              </span>
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`px-2 py-1 rounded text-xs font-medium border transition ${
                  todo.completed
                    ? "border-green-500 hover:bg-green-500 hover:text-white"
                    : "border-yellow-500 hover:bg-yellow-500 hover:text-white"
                }`}
              >
                Toggle
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserToDo;
