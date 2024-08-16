//
// 커리 > 완강
export const updatedFinishCurri = async ({
  axiosInstance,
  id,
  end_date,
}: UpdateCurri) => {
  const result = await axiosInstance.put(`/curriculums/complete/${id}/`, {
    end_date,
  });
  return result.data;
};

type UpdateCurri = AxiosType & {
  id: any;
  end_date?: any;
};
