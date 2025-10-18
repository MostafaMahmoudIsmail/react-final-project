import { useQuery } from "@tanstack/react-query";

type Props = {
  userId: string | undefined;
};

const UserPosts = ({ userId }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userposts", userId],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  if (isLoading)
    return <div className="text-center py-4 text-gray-500 animate-pulse">Loading posts...</div>;

  if (isError)
    return <div className="text-center py-4 text-red-500 font-medium">Error loading posts.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2"> User Posts</h2>
      <div className="grid gap-4">
        {data.map((post: { id: number; title: string; body: string }) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-blue-50 transition-all duration-200"
          >
            <h3 className="font-semibold text-lg text-gray-800 mb-1">{post.title}</h3>
            <p className="text-gray-600 text-sm">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
