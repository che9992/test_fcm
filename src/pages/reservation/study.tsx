import React, { useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery, useMoment } from "@/libs/hooks";

//apis
import { getAllReservation } from "@/app/reservation/apis/getAllReservation";
import { createdReservate } from "@/app/reservation/apis/createdReservate";
import { cancelReservate } from "@/app/reservation/apis/cancelReservate";

//libs
import { CalenderModal, Input } from "@/_ui";

//components
import Table from "@/app/reservation/components/Table";
import ReservateWrapper from "@/app/reservation/components/ReservateWrapper";

//
export default function Index() {
  const { axiosInstance, router } = useCore();
  const { queryKey, queryClient, useMutation, useQuery } = useTanstackQuery();

  const [isDate, setIsDate] = useState<Date>(new Date());
  const [calenderOpen, setCalenderOpen] = useState(false);

  /// 7일 제한
  const SevenDaysFromNow = new Date();
  SevenDaysFromNow.setDate(SevenDaysFromNow.getDate() + 6);

  //
  // 데이터 가져오기
  const { isLoading, data } = useQuery(
    [queryKey.예약하기.심야자습, isDate],
    () =>
      getAllReservation({
        axiosInstance,
        category: "심야자습",
        date: useMoment(isDate).format("yyyy-mm-dd"),
      }),
    {
      refetchOnWindowFocus: false,
      enabled: router.isReady,
      keepPreviousData: true,
    }
  );

  //
  // : 예약하기
  const { mutate: onReservate } = useMutation(
    (id: number) =>
      createdReservate({
        axiosInstance,
        category: "심야자습",
        date: useMoment(isDate).format("yyyy-mm-dd"),
        time: id,
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([queryKey.예약하기.심야자습, isDate]);
      },
    }
  );

  //
  // : 예약취소
  const { mutate: onCancel } = useMutation(
    (id) => cancelReservate({ axiosInstance, category: "심야자습", id }),
    {
      onSuccess: (data) =>
        queryClient.invalidateQueries([queryKey.예약하기.심야자습, isDate]),
    }
  );

  return (
    <>
      <ReservateWrapper title="심야자습" data={data} loading={isLoading}>
        <Input.Dummy
          placeholder=""
          value={isDate && useMoment(isDate).format("yyyy-mm-dd")}
          onClick={() => setCalenderOpen(true)}
        />

        <Table data={data} onReservate={onReservate} onCancel={onCancel} />
      </ReservateWrapper>

      {/* 날짜 모달 */}
      <CalenderModal
        open={calenderOpen}
        onCancel={() => setCalenderOpen(false)}
        date={isDate}
        minDate={new Date()}
        maxDate={SevenDaysFromNow}
        onClick={(date: any) => {
          setIsDate(date);
          setCalenderOpen(false);
        }}
      />
    </>
  );
}

Index.auth = true;
