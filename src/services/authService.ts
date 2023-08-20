import { instance } from "../api/api";
import { LOGIN, PASSWORD, CLIENT_ID, SECRET_KEY } from "../constants/http/http";
import { IAuth } from "../types/auth.interface";

export const auth = async (): Promise<IAuth> => {
  const { data } = await instance.get<IAuth>(
    `/oauth2/password/?login=${LOGIN}&password=${PASSWORD}&client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`
  );
  instance.defaults.headers.common = {
    Authorization: `Bearer ${data.access_token}`,
  };
  return data;
};
