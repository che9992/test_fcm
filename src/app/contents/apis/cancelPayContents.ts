//
// 콘텐츠 > 나의 콘텐츠 목록 > 결체 취소 요청
export const cancelPayContents = async ({
  axiosInstance,
  purchase_id,
  cancels,
}: AxiosType & { purchase_id: string; cancels: string }) => {
  const result = await axiosInstance.put(
    `/contents/purchases/${purchase_id}/request_cancel/`,
    { cancels }
  );
  return result.data;
};
