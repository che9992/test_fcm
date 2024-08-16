//
// 문의하기 > 내역
export const getAllFaqs = async ({
  axiosInstance,
  page,
  status,
  search,
}: AxiosType & {
  page: number;
  status: string;
  search: string | undefined;
}) => {
  const result = await axiosInstance.get(
    `/inquiries/list/?page=${page}&status=${status}&search=${search}`
  );

  return result.data;
};
