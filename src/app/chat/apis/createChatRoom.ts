//
// 채팅방 생성
export const createChatRoom = async ({
  axiosInstance,
  teacher,
  category,
}: AxiosType & { category: any; teacher: any }) => {
  const result = await axiosInstance.post(`/chats/room/create/`, {
    teacher,
    category,
  });
  return result.data;
};
