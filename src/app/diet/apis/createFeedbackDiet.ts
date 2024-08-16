//
// 식단 > 피드백
export const createFeedbackDiet = async ({
  axiosInstance,
  date,
  score,
  type,
  content,
}: AxiosType & { date: any; score: string; type: string; content: string }) => {
  const result = await axiosInstance.post(`/boards/foodmenu/feedback/add/`, {
    date,
    score,
    type,
    content,
  });

  return result.data;
};
