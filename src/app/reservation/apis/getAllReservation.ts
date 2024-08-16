type ReservationsType = {
  category?: "컴퓨터" | "전화" | "운동" | "심야자습" | "나의예약";
  date?: string | undefined | any;
  page?: any;
  type?: any;
} & AxiosType;

//
// 예약 목록
export const getAllReservation = async ({
  axiosInstance,
  category,
  date,
  page,
  type = "",
}: ReservationsType) => {
  let result;

  if (category === "컴퓨터") {
    result = await axiosInstance.get(
      `/reservations/computer/list/?date=${date}`
    );
  }

  if (category === "전화") {
    result = await axiosInstance.get(`/reservations/call/list/?date=${date}`);
  }

  if (category === "운동") {
    result = await axiosInstance.get(`/reservations/gym/list/?date=${date}`);
  }

  if (category === "심야자습") {
    result = await axiosInstance.get(
      `/reservations/extra_study/list/?date=${date}`
    );
  }

  if (category === "나의예약") {
    result = await axiosInstance.get(
      `/reservations/my/?type=${type}&page=${page}`
    );
  }

  return result.data;
};
