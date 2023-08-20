import axios from "axios";

export const instance = axios.create({
  baseURL: "https://startup-summer-2023-proxy.onrender.com/2.0/",
  headers: {
    "x-secret-key": " GEU4nvd3rej*jeh.eqp",
    "X-Api-App-Id":
      "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
  },
});

// instance.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 404 && !error.config._isRetry) {
//       try {
//         originalRequest._isRetry = true;
//         const { data } = await instance.get<IUserData>(`${BASEURL}/refresh`, {
//           withCredentials: true,
//         });
//         localStorage.setItem("token", data.accessToken);
//         return instance.request(originalRequest);
//       } catch (error) {
//         console.log("Не Авторизован");
//       }
//     }
//     throw error;
//   }
// );
