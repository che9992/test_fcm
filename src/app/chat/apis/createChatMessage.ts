//
// 메시지 전송 > 텍스트
export const createTextMessage = async ({
  axiosInstance,
  id,
  message,
}: AxiosType & { id: any; message: string }) => {
  const result = await axiosInstance.post(`/chats/message/create/`, {
    roomId: id,
    message,
  });
  return result.data;
};

//
// 메시지 전송 > 파일
export const createFileMessage = async ({
  axiosInstance,
  id,
  file,
}: AxiosType & { id: any; file: { title: any; file: any } }) => {
  const result = await axiosInstance.post(`/chats/message/file/create/`, {
    roomId: id,
    file,
  });
  return result.data;
};
