//
/// 학습 자료실 > 리스트
export const getAllLibraries = async ({
  axiosInstance,
  page = 1,
  subject = "",
  search = "",
}: AxiosType & { page: number; subject: any; search: any }) => {
  const result = await axiosInstance.get(
    `/boards/handout/list/?page=${page}&subject=${subject}&search=${search}`
  );

  return result.data;
};
