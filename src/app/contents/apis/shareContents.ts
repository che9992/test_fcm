//
// 콘텐츠 > 대리결제 > 공유하기
export const shareContents = async ({
  axiosInstance,
  phone_number,
  content_id,
  url,
}: AxiosType & {
  phone_number: any;
  content_id: any;
  url: string;
}) => {
  const { data } = await axiosInstance.post("/contents/detail/send_share/", {
    phone_number,
    content_id,
    url,
  });
  return data;
};
