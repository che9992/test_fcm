//
// 성적 > 상세
export const getGradeDetail = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  const result = await axiosInstance.get(`/grades/detail/${id}/`);

  return result.data;
};
