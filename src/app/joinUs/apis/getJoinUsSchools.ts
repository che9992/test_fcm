//

import axios from "@/app/_layout/apis/axios";

// 가입하기 > 학교정보
export const getJoinUsSchools = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  const result = await axios.get(
    `/students/school/search/?name=${search}&page=${page}`
  );

  return result.data;
};
