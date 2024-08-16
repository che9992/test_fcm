//
// 커리 > 수정
export const updatedCurri = async ({
  axiosInstance,
  id,
  subject,
  section,
  title,
  author,
  start_date,
  end_date,
  state,
}: Type) => {
  try {
    const result = await axiosInstance.put(`/curriculums/update/${id}/`, {
      subject,
      section,
      title,
      author,
      start_date,
      end_date,
      state,
    });

    return result.data;
  } catch (error) {
    throw error;
  }
};

type Type = AxiosType & {
  id?: any;
  subject: string;
  section: string;
  title: string;
  author: string;
  start_date: any;
  end_date: any;
  state: string;
};
