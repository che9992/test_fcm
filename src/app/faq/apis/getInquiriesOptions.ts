export const getInquiriesOptions = async ({ axiosInstance }: AxiosType) => {
  const result = await axiosInstance.get("/inquiries/option/");
  return result.data;
};
