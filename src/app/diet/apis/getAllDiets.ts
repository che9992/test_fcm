//
/// 식단관리 > 리스트
export const getAllDiets = async ({
  axiosInstance,
  page = 1,
  search = "",
}: AxiosType & { page: number; search: any }) => {
  const result = await axiosInstance.get(
    `/boards/foodmenu/list/?page=${page}&search=${search}`
  );

  return result.data;
};
