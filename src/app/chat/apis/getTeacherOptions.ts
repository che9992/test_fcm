//
// 채팅방 생성 > 선생님 옵션
export const getTeacherOptions = async ({
  axiosInstance,
  search,
}: AxiosType & { search: string }) => {
  const result = await axiosInstance.get(
    `/chats/teacher/list/?search=${search}`
  );
  return result.data;
};
