import { createContext, useEffect, useState } from "react";
import { IContext, IAuthProvider, IUser } from "./types";
import {
  LoginRequest,
  getUserLocalStorage,
  setUserLocalStorage,
} from "./utils";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);
    
    if (response?.status == 200) {
      const body = await response.json();

      const payload = {
        uuid: body.data?.user?.id,
        name: body.data?.user?.name,
        email: body.data?.user?.email,
        refreshToken: body.data?.refresh_token,
        accessToken: body.data?.access_token,
      };

      setUser(payload);
      setUserLocalStorage(payload);

      return true;
    }

    return false;
  }

  async function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};