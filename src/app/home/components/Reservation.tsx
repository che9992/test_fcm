import { useRouter } from "next/router";

//libs
import { Spacing, Txt, TxtSpan, V } from "@/_ui";
import { colors } from "@/libs/themes";

//utils
import { ROUTE_PATH } from "@/libs/utils/route_path";

//components
import { HomeBox } from "@/pages";

//
export default function Reservation({ data }: { data: any }) {
  const router = useRouter();

  return (
    <HomeBox title="나의 예약">
      <V.Column>
        <V.Row crossAlign="space-between" align="start">
          <Txt color={colors.grey700} whiteSpace="nowrap" size={14}>
            컴퓨터 예약
          </Txt>

          {data?.computer.length <= 0 ? (
            <TxtSpan size={14} color="#555">
              -
            </TxtSpan>
          ) : (
            <V.Column css={{ width: "auto" }} gap={4}>
              {data?.computer?.map((item: any) => (
                <Txt
                  key={item?.id}
                  size={14}
                  color={colors.grey900}
                  onClick={() =>
                    router.push(
                      `${ROUTE_PATH.예약하기.나의예약}/?filter=computer`
                    )
                  }
                  css={{ cursor: "pointer" }}
                >
                  {`${item?.date}  (${item?.time?.start_time} ~ ${item?.time?.end_time})`}
                </Txt>
              ))}
            </V.Column>
          )}
        </V.Row>

        <Spacing size={16} />

        <V.Row crossAlign="space-between" align="start">
          <Txt color={colors.grey700} whiteSpace="nowrap" size={14}>
            전화 예약
          </Txt>

          {data?.call.length <= 0 ? (
            <TxtSpan size={14} color="#555">
              -
            </TxtSpan>
          ) : (
            <V.Column css={{ width: "auto" }} gap={4}>
              {data?.call?.map((item: any) => (
                <Txt
                  key={item?.id}
                  size={14}
                  color={colors.grey900}
                  onClick={() =>
                    router.push(`${ROUTE_PATH.예약하기.나의예약}/?filter=call`)
                  }
                  css={{ cursor: "pointer" }}
                >
                  {`${item?.date}  (${item?.time?.start_time} ~ ${item?.time?.end_time})`}
                </Txt>
              ))}
            </V.Column>
          )}
        </V.Row>

        <Spacing size={16} />

        <V.Row crossAlign="space-between" align="start">
          <Txt color={colors.grey700} whiteSpace="nowrap" size={14}>
            운동 예약
          </Txt>

          {data?.gym.length <= 0 ? (
            <TxtSpan size={14} color="#555">
              -
            </TxtSpan>
          ) : (
            <V.Column css={{ width: "auto" }} gap={4}>
              {data?.gym?.map((item: any) => (
                <Txt
                  key={item?.id}
                  size={14}
                  color={colors.grey900}
                  onClick={() =>
                    router.push(`${ROUTE_PATH.예약하기.나의예약}/?filter=gym`)
                  }
                  css={{ cursor: "pointer" }}
                >
                  {`${item?.date}  (${item?.time?.start_time} ~ ${item?.time?.end_time})`}
                </Txt>
              ))}
            </V.Column>
          )}
        </V.Row>

        <Spacing size={16} />

        <V.Row crossAlign="space-between" align="start">
          <Txt color={colors.grey700} whiteSpace="nowrap" size={14}>
            심야자습 예약
          </Txt>

          {data?.extra_study.length <= 0 ? (
            <TxtSpan size={14} color="#555">
              -
            </TxtSpan>
          ) : (
            <V.Column css={{ width: "auto" }} gap={4}>
              {data?.extra_study?.map((item: any) => (
                <Txt
                  key={item?.id}
                  size={14}
                  color={colors.grey900}
                  onClick={() =>
                    router.push(
                      `${ROUTE_PATH.예약하기.나의예약}/?filter=extra_study`
                    )
                  }
                  css={{ cursor: "pointer" }}
                >
                  {`${item?.date}  (${item?.time?.start_time} ~ ${item?.time?.end_time})`}
                </Txt>
              ))}
            </V.Column>
          )}
        </V.Row>
      </V.Column>
    </HomeBox>
  );
}
