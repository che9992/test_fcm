// import { axiosAuth } from './axios';
// import { useSession } from 'next-auth/react';
// import { useEffect } from 'react';
// import { useRefreshToken } from './_useRefreshToken';

// export function useAxios() {
//   const { data: session } = useSession();
//   const refreshToken = useRefreshToken();

//   useEffect(() => {
//     const requestIntercept = axiosAuth.interceptors.request.use(
//       (config) => {
//         if (!config.headers['Authorization']) {
//           config.headers['Authorization'] = `Bearer ${session?.accessToken}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );

//     const responseIntercept = axiosAuth.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const prevRequest = error?.config;

//         if (error?.response?.status === 401 && !prevRequest?.sent) {
//           prevRequest.sent = true;
//           await refreshToken();
//           prevRequest.headers[
//             'Authorization'
//           ] = `Bearer ${session?.accessToken}`;
//           return axiosAuth(prevRequest);
//         }
//         return Promise.reject(error);
//       },
//     );

//     return () => {
//       axiosAuth.interceptors.request.eject(requestIntercept);
//       axiosAuth.interceptors.response.eject(responseIntercept);
//     };
//   }, [session, refreshToken]);

//   return axiosAuth;
// }

import { axiosAuth } from "./axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./_useRefreshToken";

export function useAxios() {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        // 토큰을 헤더에 항상 추가하도록 보장
        config.headers["Authorization"] = `Bearer ${
          session?.accessToken || ""
        }`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response?.status === 401 && !prevRequest._retry) {
          prevRequest._retry = true;
          try {
            await refreshToken(); // 토큰 갱신 시도
            // 헤더 업데이트 및 이전 요청 재시도
            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${session?.accessToken}`;
            return axiosAuth(prevRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]); // session 또는 refreshToken이 변경될 때 useEffect가 호출되도록 함

  return axiosAuth;
}
