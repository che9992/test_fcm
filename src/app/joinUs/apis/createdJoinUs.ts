import axios from "@/app/_layout/apis/axios";

// 회원가입 하기
export const createdJoinUs = async (data: any) => {
  const result = await axios.post("/accounts/student/signup/", data);
  return result.data;
};
