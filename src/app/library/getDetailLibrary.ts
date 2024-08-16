//
/// 학습 자료실 > 상세
export const getDetailLibrary = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  const result = await axiosInstance.get(`/boards/handout/detail/${id}/`);
  return result.data;
};
