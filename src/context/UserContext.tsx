import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../services/authService";
import { IAuth } from "../types/auth.interface";

export const UserContext = createContext({});

export const UserContextProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await auth();
        setAccessToken(data.access_token);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ accessToken }}>
      {children}
    </UserContext.Provider>
  );
};
