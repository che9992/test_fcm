type AxiosType = { axiosInstance: any };

export const getAllVacations = async ({ axiosInstance }: AxiosType) => {
  const result = await axiosInstance.get(`/vacations/list/my/`);
  return result.data;
};
