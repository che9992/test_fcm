//
// 나의 알림 업데이트
export const updatedMyAlarm = async ({
  axiosInstance,
  body,
}: AxiosType & { body: any }) => {
  try {
    const result = await axiosInstance.put(
      `/accounts/notification-settings/edit/`,
      body
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};
