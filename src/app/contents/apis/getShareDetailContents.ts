import axios, { BASE_URLS } from "@/app/_layout/apis/axios";

// 콘텐츠 > 대리결제 > 상세
export const getShareDetailContents = async ({
  contentId,
  userId,
}: {
  contentId: any;
  userId: any;
}) => {
  const result = await axios.get(
    `${BASE_URLS}/contents/detail/${contentId}/share/${userId}/`
  );
  return result.data;
};
