//
// 문의하기 > 상세
export const getDetailFaq = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  const result = await axiosInstance.get(`/inquiries/detail/${id}/`);
  return result.data;
};
