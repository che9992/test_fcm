//
// 커리 > 상세 > 코멘트
export const getCurriMemos = async ({
  axiosInstance,
  id,
  page,
}: AxiosType & { id: any; page: number }) => {
  const result = await axiosInstance.get(
    `/curriculums/comment/list/${id}/?page=${page}`
  );

  return result.data;
};
