//
// 콘텐츠 > 전체
export const getAllContents = async ({
  axiosInstance,
  page = 1,
  search = "",
  on_sale = "",
}: AxiosType & { page: number; search: any; on_sale: any }) => {
  const result = await axiosInstance.get(
    `/contents/list/?page=${page}&search=${search}&on_sale=${on_sale}`
  );

  return result.data;
};
