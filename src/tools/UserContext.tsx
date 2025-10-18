import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userLogin, setUserLogin] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      setUserLogin(savedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
