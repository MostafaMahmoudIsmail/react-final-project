import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../tools/UserContext";

const LoginPage = () => {
  const { userLogin, setUserLogin } = useContext(UserContext) as {
    userLogin: string;
    setUserLogin: (user: string) => void;
  };

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userLogin === "admin" && password === "password") {
      localStorage.setItem("auth_token", "123");
      localStorage.setItem("username", userLogin);
      setUserLogin(userLogin);
      navigate("/dashboard");
      return;
    }

    setError("Invalid credentials");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
             Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={userLogin}
              placeholder="Enter your username"
              onChange={(e) => setUserLogin(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          <strong>admin</strong> / <strong>password</strong>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
