type ReservateType = {
  category: "컴퓨터" | "전화" | "운동" | "심야자습" | "나의예약";
  date: any;
  time: number;
} & AxiosType;

// 예약 하기
export const createdReservate = async ({
  axiosInstance,
  category,
  date,
  time,
}: ReservateType) => {
  let result;

  if (category === "컴퓨터") {
    result = await axiosInstance.post(`/reservations/computer/add/`, {
      date,
      time,
    });
  }

  if (category === "전화") {
    result = await axiosInstance.post(`/reservations/call/add/`, {
      date,
      time,
    });
  }

  if (category === "운동") {
    result = await axiosInstance.post(`/reservations/gym/add/`, {
      date,
      time,
    });
  }

  if (category === "심야자습") {
    result = await axiosInstance.post(`/reservations/extra_study/add/`, {
      date,
      time,
    });
  }

  return result.data;
};
