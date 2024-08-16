//
// 마이페이지 > 프로필
export const getMyProfile = async ({ axiosInstance }: AxiosType) => {
  const result = await axiosInstance.get("/accounts/mypage/");
  return result.data;
};
