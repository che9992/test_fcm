//
// 상담 > 데이터
export const getConsoultDetail = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  const result = await axiosInstance.get(`/consultations/detail/${id}/`);
  return result.data;
};
