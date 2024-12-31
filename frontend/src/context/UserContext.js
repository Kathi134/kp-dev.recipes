import React, { createContext, useContext } from "react";
import { useLocalStorage } from '../extentions';
import { User } from "../model/User";


const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", new User());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
