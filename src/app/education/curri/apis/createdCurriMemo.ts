//
// 커리 > 상세 > 코멘트 > 작성
export const createdCurriMemo = async ({
  axiosInstance,
  curriculum,
  content,
}: AxiosType & {
  curriculum: string | string[] | undefined;
  content: string;
}) => {
  const result = await axiosInstance.post(`/curriculums/comment/add/my/`, {
    curriculum,
    content,
  });

  return result.data;
};
