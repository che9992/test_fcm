//
/// 알람 > 읽음처리
export const updatedReadAlarm = async ({
  axiosInstance,
  id,
}: AxiosType & { pageToken?: number; id: any }) => {
  const result = await axiosInstance.put(
    `/accounts/notifications/${id}/mark_as_read/`
  );
  return result.data;
};
