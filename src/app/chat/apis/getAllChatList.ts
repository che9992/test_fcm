type Types = {
  search?: any;
  status?: any;
  group?: any;
  read?: any;
  page?: any;
  page_size?: number;
} & AxiosType;

//
// 채팅방 리스트
export const getAllChatList = async ({
  axiosInstance,
  search = "",
  status = "진행중",
  group = null,
  read = null,
  page = 1,
  page_size = 10,
}: Types) => {
  const result = await axiosInstance.get(
    `/chats/room/list/?search=${search}&status=${status}&group=${group}&read=${read}&page=${page}&page_size=${page_size}`
  );
  return result.data;
};
