import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../tools/UserContext";



const LoginPage = () => {
    const {userLogin,setUserLogin} = useContext(UserContext) as {
        userLogin: string,
        setUserLogin: (user: string) => void
    };
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userLogin === "admin" && password === "password") {
            localStorage.setItem("auth_token", "123");
            setUserLogin(userLogin);
            navigate("/dashboard");
        }

        setError("Invalid credentials");

    }


    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input type="text"
            value={userLogin}
            placeholder="Your User Name"
            onChange={(e) => setUserLogin(e.target.value)}
            />
            <label>Password</label>
            <input
            type="password"
            value={password}
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>

        {error && <p style={{color: "red"}}>{error}</p>}

        </>
    )
}


export default LoginPage;