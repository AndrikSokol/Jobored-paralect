import { instance } from "../api/api";
import { IAuth } from "../types/auth.interface";

const LOGIN = "sergei.stralenia@gmail.com";
const PASSWORD = "paralect123";
const CLIENT_ID = "2356";
const SECRET_KEY =
  "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";

export const auth = async (): Promise<IAuth> => {
  const { data } = await instance.get<IAuth>(
    `password/?login=${LOGIN}&password=${PASSWORD}&client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`
  );
  instance.defaults.headers.common = {
    Authorization: `Bearer ${data.access_token}`,
  };
  return data;
};
