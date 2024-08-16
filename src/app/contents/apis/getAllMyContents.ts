//
// 콘텐츠 > 나의 구매목록
export const getAllMyContents = async ({
  axiosInstance,
  page = 1,
  search = "",
  status = "",
}: AxiosType & { page: number; search: string; status: string }) => {
  const result = await axiosInstance.get(
    `/contents/purchases/my/list/?page=${page}&search=${search}&status=${status}`
  );

  return result.data;
};
