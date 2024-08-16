//
// 상세
export const getDetailNotice = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  const result = await axiosInstance.get(`/boards/notice/detail/${id}/`);

  return result.data;
};
