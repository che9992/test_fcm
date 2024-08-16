// 문의 > 삭제
export const removeFaq = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  const result = await axiosInstance.delete(`/inquiries/delete/${id}/`);
  return result.data;
};
