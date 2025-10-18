import { useEffect, useState } from "react";

type User = { id: number; username: string };
type Post = { userId: number };
type Todo = { userId: number; completed: boolean };

const AnalyticsCard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [u, p, t] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users").then((r) =>
            r.json()
          ),
          fetch("https://jsonplaceholder.typicode.com/posts").then((r) =>
            r.json()
          ),
          fetch("https://jsonplaceholder.typicode.com/todos").then((r) =>
            r.json()
          ),
        ]);
        setUsers(u);
        setPosts(p);
        setTodos(t);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <p>Loading analytics...</p>;

  const stats = users.map((u) => {
    const userPosts = posts.filter((p) => p.userId === u.id);
    const userTodos = todos.filter((t) => t.userId === u.id);
    const completed = userTodos.filter((t) => t.completed).length;

    return {
      username: u.username,
      totalPosts: userPosts.length,
      completedTodos: completed,
    };
  });

  const mostPosts = [...stats].sort((a, b) => b.totalPosts - a.totalPosts)[0];
  const fewestPosts = [...stats].sort((a, b) => a.totalPosts - b.totalPosts)[0];
  const mostCompleted = [...stats].sort(
    (a, b) => b.completedTodos - a.completedTodos
  )[0];
  const fewestCompleted = [...stats].sort(
    (a, b) => a.completedTodos - b.completedTodos
  )[0];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-2xl mt-6">
      <h2 className="text-xl font-bold mb-4"> Simple Analytics</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className="p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">Most Posts</h3>
          <p>{mostPosts.username}</p>
          <p>{mostPosts.totalPosts} posts</p>
        </div>

        <div className="p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">Fewest Posts</h3>
          <p>{fewestPosts.username}</p>
          <p>{fewestPosts.totalPosts} posts</p>
        </div>

        <div className="p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">Most Completed Todos</h3>
          <p>{mostCompleted.username}</p>
          <p>{mostCompleted.completedTodos} done</p>
        </div>

        <div className="p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">Fewest Completed Todos</h3>
          <p>{fewestCompleted.username}</p>
          <p>{fewestCompleted.completedTodos} done</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
