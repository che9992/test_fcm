import axios from "@/app/_layout/apis/axios";

// 가입하기 > 옵션
export const getJoinUsOptions = async () => {
  const result = await axios.get("/accounts/student/signup/");
  return result.data;
};
