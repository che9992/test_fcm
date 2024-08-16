//
// 학과/생활 > 수정
export const updatedFaq = async ({
  id,
  axiosInstance,
  learning_question,
  prefer,
  title,
  content,
  category,
  teacher,
  files,
}: Types & { id: any }) => {
  const result = await axiosInstance.put(`/inquiries/update/${id}/`, {
    learning_question,
    prefer,
    title,
    content,
    category,
    teacher,
    files,
  });
  return result.data;
};

type Types = AxiosType & {
  learning_question?: boolean;
  prefer?: string;
  title?: string;
  content?: string;
  category?: string;
  teacher?: string;
  files?: any;
};
