import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { TypeAccessToken } from "../types/accessToken.type";

export const UserContext = createContext({});

export const UserContextProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<TypeAccessToken>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(
          "https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
          { headers: { "x-secret-key": "GEU4nvd3rej*jeh.eqp" } }
        );
        console.log(data);
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
