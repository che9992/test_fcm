//
// 성적 > 상세  > 옵션
export const getGradeOptions = async ({ axiosInstance }: AxiosType) => {
  const result = await axiosInstance.get(`/grades/add/option/my/`);

  return result.data;
};
