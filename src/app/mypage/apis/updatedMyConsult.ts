//
// 나의 주기 수정
export const updatedMyConsult = async ({
  axiosInstance,
  id,
  kor_consul,
  math_consul,
  eng_consul,
}: AxiosType & {
  id: string;
  kor_consul: string | number;
  math_consul: string | number;
  eng_consul: string | number;
}) => {
  const result = await axiosInstance.put(`/consultations/cycle/${id}/`, {
    kor_consul,
    math_consul,
    eng_consul,
  });

  return result.data;
};
