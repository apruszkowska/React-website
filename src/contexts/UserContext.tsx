import { createContext, useContext, ReactNode, useState } from "react";

type User = {
  login: string;
  password: string;
};

type UserContextProps = {
  users: User[];
  addUser: (user: User) => void;
  isLoggedIn: boolean;
  logIn: (login: string, password: string) => void;
  logOut: () => void;
};

const UsersContext = createContext<UserContextProps | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const logIn = (login: string, password: string) => {
    console.log("users", users);
    const findedUser = users.find((user) => user.login === login);
    if (findedUser && findedUser.password === password) {
      setIsLoggedIn(true);
      return;
    }
    setIsLoggedIn(false);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <UsersContext.Provider
      value={{ users, addUser, isLoggedIn, logIn, logOut }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const ctx = useContext(UsersContext);

  if (!ctx) {
    throw new Error("Missing UsersContext, it's not wrapped in UsersProvider");
  }
  return ctx;
};
