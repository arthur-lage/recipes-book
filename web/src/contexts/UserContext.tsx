import { useState, createContext } from "react";

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
  handleSetIsAuth: (isAuth: boolean) => void;
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
  };

  const handleSetIsAuth = (isAuth: boolean) => {
    setIsAuth(isAuth);
  };

  const value = {
    user,
    handleSetUser,
    isAuth,
    token,
    handleSetToken,
    handleSetIsAuth,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
