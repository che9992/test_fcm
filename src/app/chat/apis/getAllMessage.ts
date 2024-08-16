//
/// 채팅방 > 메시지
export const getAllMessage = async ({
  axiosInstance,
  pageToken = 0,
  roomId,
  page_size = 2,
}: AxiosType & { pageToken?: number; roomId: any; page_size?: number }) => {
  const result = await axiosInstance.get(
    `/chats/message/list/?roomId=${roomId}&pageToken=${pageToken}&page_size=${page_size}`
  );
  return result.data;
};
