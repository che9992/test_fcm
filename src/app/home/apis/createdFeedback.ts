type Type = { axiosInstance: any; title: string; content: string; files: any };

export const createdFeedback = async ({
  axiosInstance,
  title,
  content,
  files,
}: Type) => {
  const result = await axiosInstance.post("/inquiries/improve/add/", {
    title,
    content,
    files,
  });
  return result.data;
};
