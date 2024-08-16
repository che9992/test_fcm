//
/// 알람 > 모든 읽음처리
export const updatedAllReadAlarm = async ({
  axiosInstance,
}: AxiosType & { pageToken?: number }) => {
  const result = await axiosInstance.put(
    `accounts/notifications/mark_all_as_read/`
  );
  return result.data;
};
