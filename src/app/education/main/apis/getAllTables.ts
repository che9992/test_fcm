type Types = AxiosType & {
  category: "성적" | "커리큘럼" | "상담";
  page: number;
  search: string;
  state?: string;
};

// 테이블
export const getAllEduTables = async ({
  axiosInstance,
  category,
  page,
  state,
  search,
}: Types) => {
  let result;

  if (category === "성적") {
    result = await axiosInstance.get(
      `/grades/list/my/?page=${page}&search=${search}`
    );
  }

  if (category === "커리큘럼") {
    result = await axiosInstance.get(
      `/curriculums/list/my/?page=${page}&state=${state}&search=${search}`
    );
  }

  if (category === "상담") {
    result = await axiosInstance.get(
      `/consultations/list/my/?page=${page}&search=${search}`
    );
  }

  return result.data;
};
