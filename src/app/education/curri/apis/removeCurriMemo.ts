type UpdateCurri = AxiosType & {
  id: any;
  end_date?: any;
};

//
// 커리 > 상세 > 코멘트 > 삭제
export const removeCurriMemo = async ({ axiosInstance, id }: UpdateCurri) => {
  const result = await axiosInstance.delete(
    `/curriculums/comment/delete/${id}/`
  );
  return result.data;
};
