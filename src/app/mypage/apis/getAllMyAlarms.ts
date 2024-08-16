//
// 나의 알림 값
export const getAllMyAlarms = async ({ axiosInstance }: AxiosType) => {
  try {
    const result = await axiosInstance.get(`/accounts/notification-settings/`);
    return result.data;
  } catch (error) {
    throw error;
  }
};
