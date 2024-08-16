//
/// 학습 자료실 > 옵션
export const getLibraryOptions = async ({ axiosInstance }: AxiosType) => {
  const result = await axiosInstance.get(`/boards/subject/option/`);
  return result.data;
};
