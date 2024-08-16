//
// 성적 > 추가
export const createGrade = async ({
  axiosInstance,
  data,
}: AxiosType & { data: any }) => {
  try {
    const result = await axiosInstance.post(`/grades/add/my/`, data);
    return result.data;
  } catch (error) {
    throw error;
  }
};
