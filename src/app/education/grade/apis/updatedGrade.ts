//
// 성적 > 성적 수정
export const updatedGrade = async ({
  axiosInstance,
  id,
  data,
}: AxiosType & { id: any; data: any }) => {
  try {
    const result = await axiosInstance.put(`/grades/update/${id}/`, data);
    return result.data;
  } catch (error) {
    throw error;
  }
};
