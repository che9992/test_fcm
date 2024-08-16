type Types = {
  id: any;
} & AxiosType;

//
// 채팅방 정보
export const getChatRoom = async ({ axiosInstance, id }: Types) => {
  const result = await axiosInstance.get(`/chats/room/${id}/`);
  return result.data;
};
