//
// 공지사항
export const getAllNotices = async ({
  axiosInstance,
  page = 1,
  search = "",
}: AxiosType & { page: number; search: any }) => {
  const result = await axiosInstance.get(
    `/boards/notice/list/?page=${page}&search=${search}`
  );

  return result.data;
};
