import { useState, createContext, useEffect } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
};

type UserContextProps = {
  user: User | null;
  handleSetUser: (user: User | null) => void;
  isAuth: boolean;
  token: string | null;
  handleSetToken: (token: string | null) => void;
};

export const UserContext = createContext({} as UserContextProps);

type Props = {
  children: React.ReactNode;
};

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>({} as User);
  const [token, setToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleSetUser = (user: User | null) => {
    setUser(user);
  };

  const handleSetToken = (token: string | null) => {
    setToken(token);

    localStorage.setItem("token", JSON.stringify(token));
  };

  useEffect(() => {
    if(localStorage.getItem("token") !== null) {
      setToken(JSON.parse(localStorage.getItem("token") as string));
    }

    if (token === null) {
      return;
    }

    //@ts-ignore
    api.defaults.headers.authorization = `Bearer ${token}`;

    api
      .get("/users/auth")
      .then((res) => {
        handleSetUser({
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
        });

        setIsAuth(true);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const value = {
    user,
    handleSetUser,
    isAuth,
    token,
    handleSetToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
