//
// 채팅방 생성 > 과목옵션
export const getSubjectOptions = async ({ axiosInstance }: AxiosType) => {
  const result = await axiosInstance.get(`/chats/subjects/`);
  return result.data;
};
