//
/// 삭단관리 > 상세
export const getDetailDiet = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  const result = await axiosInstance.get(`/boards/foodmenu/detail/${id}/`);

  return result.data;
};
