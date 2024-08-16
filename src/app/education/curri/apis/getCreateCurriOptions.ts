//
// 커리 > 추가 > 옵션
export const getCreateCurriOptions = async ({ axiosInstance }: AxiosType) => {
  const result = await axiosInstance.get(`/curriculums/add/option/`);

  return result.data;
};
