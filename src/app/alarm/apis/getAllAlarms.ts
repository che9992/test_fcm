/// 알람 > 리스트
export const getAllAlarms = async ({
  axiosInstance,
  pageToken = 0,
}: AxiosType & { pageToken?: number }) => {
  const result = await axiosInstance.get(
    `/accounts/notifications/list/?pageToken=${pageToken}`
  );
  return result.data;
};
