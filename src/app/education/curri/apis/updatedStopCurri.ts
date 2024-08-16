// 커리 > 중단
export const updatedStopCurri = async ({
  axiosInstance,
  id,
  end_date,
}: UpdateCurri) => {
  const result = await axiosInstance.put(`/curriculums/end/${id}/`, {
    end_date,
  });
  return result.data;
};

type UpdateCurri = AxiosType & {
  id: any;
  end_date?: any;
};
