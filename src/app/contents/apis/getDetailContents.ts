//
// 콘텐츠 > 상세
export const getDetailContent = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  const result = await axiosInstance.get(`/contents/detail/${id}/`);
  return result.data;
};
