import { Spacing, TouchableOpacity, Txt, TxtSpan, V } from "@/_ui";
import { alartAtom } from "@/app/_layout/atoms/widgets-atom";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { colors } from "@/libs/themes/colors";
import { useSetRecoilState } from "recoil";
import { cancelReservate } from "../apis/cancelReservate";

export default function MyTable({ item, data }: { item: any; data: any }) {
  const { axiosInstance, router } = useCore();
  const { page, type } = router.query ?? {};
  const { queryKey, queryClient, useMutation, useQuery } = useTanstackQuery();

  const setIsAlart = useSetRecoilState(alartAtom);

  const nowDate = new Date();
  const isDate = (e: Date) => new Date(e);

  const onSuccess = () => {
    setIsAlart(true);
    queryClient.invalidateQueries([queryKey.예약하기.마이페이지]);
  };

  //
  // 컴퓨터 예약취소
  const { mutate: onCancelComputer } = useMutation(
    () => cancelReservate({ axiosInstance, category: "컴퓨터", id: item.id }),
    {
      onSuccess: (data) => onSuccess(),
    }
  );

  //
  // 전화 예약취소
  const { mutate: onCancelCall } = useMutation(
    () => cancelReservate({ axiosInstance, category: "전화", id: item.id }),
    {
      onSuccess: (data) => onSuccess(),
    }
  );

  //
  // 운동 예약취소
  const { mutate: onCancelGym } = useMutation(
    () => cancelReservate({ axiosInstance, category: "운동", id: item.id }),
    {
      onSuccess: (data) => onSuccess(),
    }
  );

  //
  // 심야자습 예약취소
  const { mutate: onCancelStudy } = useMutation(
    () => cancelReservate({ axiosInstance, category: "심야자습", id: item.id }),
    {
      onSuccess: (data) => onSuccess(),
    }
  );

  //
  // 최소 핸들러
  const onCancelReservate = () => {
    if (type === "computer") return onCancelComputer();
    if (type === "call") return onCancelCall();
    if (type === "gym") return onCancelGym();
    if (type === "extra_study") return onCancelStudy();

    return onCancelComputer();
  };

  return (
    <V.Column
      padding={{ all: 16 }}
      borderRadius={16}
      border={{ solid: 1, color: "#e2e2e2" }}
    >
      <V.Row crossAlign="space-between" align="center">
        <TxtSpan size={14} color="#797979">
          {item?.date} 예약
        </TxtSpan>

        {!item?.time?.is_close && (
          <TouchableOpacity onClick={() => onCancelReservate()}>
            <TxtSpan color={colors.red} weight="medium">
              사용취소
            </TxtSpan>
          </TouchableOpacity>
        )}
      </V.Row>

      <Spacing size={10} />

      <V.Row align="center" gap={20}>
        <Txt size={16} color="#797979">
          시작 :{" "}
          <span css={{ fontWeight: 500, color: "#555" }}>
            {item?.time.start_time}
          </span>
        </Txt>

        <Txt size={16} color="#797979">
          종료 :{" "}
          <span css={{ fontWeight: 500, color: "#555" }}>
            {item?.time.end_time}
          </span>
        </Txt>
      </V.Row>
    </V.Column>
  );
}
