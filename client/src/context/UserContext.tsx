import React, { useState, createContext } from "react";

interface UserContextInterface {
  user: string;
  setUser: any;
}

interface Props {
  children: any;
}

export const UserContext = createContext<UserContextInterface | null>(null);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const _user = localStorage.getItem("user");
  const localSt = JSON.parse(_user ? _user : "");
  const [user, setUser] = useState(localSt ? localSt : null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
