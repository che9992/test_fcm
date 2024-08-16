export const getAllDatas = async ({ axiosInstance }: AxiosType) => {
  const result = await axiosInstance.get("/main/student/");
  return result.data;
};
