type AxiosType = { axiosInstance: any };

//
// 백엔드에서 로그인합니다.
export const getCurrentUser = async ({ axiosInstance }: AxiosType) => {
  const result = await axiosInstance.post(`/accounts/teacher/login/`, {
    email: "teacher@teacher.com",
    password: "1q2w3e4r!",
  });
  return result.data;
};

//
// 백엔드에 FCM 토큰과 디바이스 정보를 저장합니다.
export const saveToken = async ({
  axiosInstance,
  token,
  device,
}: AxiosType & { token: string; device: "ios" | "pc" | "android" | any }) => {
  const res = await axiosInstance.post("/accounts/fcmtoken/", {
    token: token,
    device_info: device,
  });

  return res.data;
};
