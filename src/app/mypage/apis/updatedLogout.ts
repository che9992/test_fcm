//
// 로그아웃
export const updatedLogout = async ({
  axiosInstance,
  refresh_token,
  fcm_token,
}: AxiosType & { refresh_token: string; fcm_token?: any }) => {
  const result = await axiosInstance.post("/accounts/logout/", {
    refresh_token,
    fcm_token,
  });
  return result.data;
};
