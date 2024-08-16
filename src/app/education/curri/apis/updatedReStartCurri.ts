//
// 커리 > 재시작
export const updatedReStartCurri = async ({
  axiosInstance,
  id,
}: UpdateCurri) => {
  const result = await axiosInstance.put(`/curriculums/restart/${id}/`);
  return result.data;
};
type UpdateCurri = AxiosType & {
  id: any;
  end_date?: any;
};
