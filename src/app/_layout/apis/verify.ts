type AxiosType = { axiosInstance: any };

//
/// 사용자 검증
export const getAppVerify = async ({
  axiosInstance,
  token,
  device,
}: AxiosType & { token: string | null; device: string }) => {
  const result = await axiosInstance.get(
    `/accounts/verify/?fcm_token=${token}&device_info=${device}`
  );
  return result.data;
};
