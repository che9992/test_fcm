type UpdateCurri = AxiosType & {
  id: any;
  end_date?: any;
};

// 커리 > 삭제
export const removeCurri = async ({ axiosInstance, id }: UpdateCurri) => {
  const result = await axiosInstance.delete(`/curriculums/delete/${id}/`);
  return result.data;
};
