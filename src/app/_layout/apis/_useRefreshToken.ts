import axios from "./axios";
import { signOut, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401) {
          signOut();
        }
        return Promise.reject(error);
      }
    );

    const res = await axios.post("/accounts/login/refresh/", {
      refresh: session?.refreshToken,
    });

    if (session) session.accessToken = res.data.access;
  };
  return refreshToken;
};
