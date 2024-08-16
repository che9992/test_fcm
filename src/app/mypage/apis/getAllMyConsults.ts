//
// 마이페이지 > 나의 주기
export const getAllMyConsults = async ({
  axiosInstance,
  id,
}: AxiosType & { id: string }) => {
  const result = await axiosInstance.get(`/consultations/cycle/${id}/`);
  return result.data;
};
