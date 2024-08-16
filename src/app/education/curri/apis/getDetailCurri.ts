//
//커리 > 상세
export const getDetailCurri = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  const result = await axiosInstance.get(`/curriculums/detail/${id}/`);
  return result.data;
};
