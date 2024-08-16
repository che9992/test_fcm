//
// 학습관리 > 커리 > 옵션
export const getTableOptions = async ({ axiosInstance }: AxiosType) => {
  const result = await axiosInstance.get(`/curriculums/list/option/`);
  return result.data;
};
