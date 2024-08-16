//
// 성적 > 상세 > 삭제
export const removeGrade = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  const result = await axiosInstance.delete(`/grades/delete/${id}/`);
  return result.data;
};
