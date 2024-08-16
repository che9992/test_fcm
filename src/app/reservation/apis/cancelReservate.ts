//
//  예약 취소
export const cancelReservate = async ({
  axiosInstance,
  category,
  id,
}: AxiosType & {
  category: "컴퓨터" | "전화" | "운동" | "심야자습" | "나의예약";
  id: any;
}) => {
  let result;

  if (category === "컴퓨터") {
    result = await axiosInstance.delete(`/reservations/computer/delete/${id}/`);
  }

  if (category === "전화") {
    result = await axiosInstance.delete(`/reservations/call/delete/${id}/`);
  }

  if (category === "운동") {
    result = await axiosInstance.delete(`/reservations/gym/delete/${id}/`);
  }

  if (category === "심야자습") {
    result = await axiosInstance.delete(
      `/reservations/extra_study/delete/${id}/`
    );
  }

  return result.data;
};
