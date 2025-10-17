import { createContext, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userLogin, setUserLogin] = useState("");

    return (
        <UserContext.Provider value={{userLogin,setUserLogin}} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;


