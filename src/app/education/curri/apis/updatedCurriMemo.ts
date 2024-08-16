//
// 커리 > 상세 > 코멘트 > 수정
export const updatedCurriMemo = async ({
  axiosInstance,
  id,
  content,
}: AxiosType & { id: any; content: string }) => {
  const result = await axiosInstance.put(`/curriculums/comment/edit/${id}/`, {
    content,
  });

  return result.data;
};
