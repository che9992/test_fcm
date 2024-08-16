type Types = AxiosType & {
  learning_question?: boolean;
  prefer?: string;
  title?: string;
  content?: string;
  category?: string;
  teacher?: string;
  files?: any;
};

//
// 학과/생활 > 작성
export const createdFaq = async ({
  axiosInstance,
  learning_question,
  prefer,
  title,
  content,
  category,
  teacher,
  files,
}: Types) => {
  const result = await axiosInstance.post(`/inquiries/add/`, {
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
