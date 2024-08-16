import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery, useMoment } from "@/libs/hooks";

//libs
import { Txt, V } from "@/_ui";
import { MQ, colors } from "@/libs/themes";

//apis
import { getAllVacations } from "@/app/vacation/getAllVacations";

//components
import View from "@/app/_layout/components/View";
import NoneResultBox from "@/libs/components/_custom/NoneResultBox";

//
export default function Vacations() {
  const { axiosInstance } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();

  const { isLoading, data } = useQuery(
    [queryKey.휴가내역],
    () => getAllVacations({ axiosInstance }),
    {
      onSuccess: (data) => {},
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return (
    <View category="서비스" loading={isLoading}>
      <V.Column align="center">
        <V.Column
          maxWidth={700}
          gap={26}
          padding={{ top: 20, bottom: 60 }}
          css={{ [MQ[3]]: { paddingBottom: 30 } }}
        >
          <V.Column gap={6} padding={{ horizontal: 20 }}>
            <Txt as="strong">휴가내역</Txt>
            <Txt color={colors.grey800}>
              그 동안 처리되었던 휴가 목록 및 내용이에요
            </Txt>
          </V.Column>

          <V.ScrollDragHorizontal>
            <V.Column>
              <V.Row>
                {["종류", "상태", "출발일", "복귀예정일", "복귀일"].map(
                  (item) => (
                    <V.Column
                      minWidth={700 / 5}
                      align="center"
                      crossAlign="center"
                      minHeight={40}
                      backgroundColor={colors.grey000}
                      css={{ color: colors.grey500, fontSize: 14 }}
                    >
                      {item}
                    </V.Column>
                  )
                )}
              </V.Row>

              {data?.length <= 0 ? (
                <NoneResultBox description="휴가 내역이 존재하지 않습니다" />
              ) : (
                <V.Column>
                  {data?.map((item: any) => (
                    <V.Row>
                      <V.Column
                        minWidth={700 / 5}
                        align="center"
                        crossAlign="center"
                        minHeight={46}
                        css={{ color: colors.grey800, fontSize: 14 }}
                        border={{
                          solid: 1,
                          position: "bottom",
                          color: colors.grey200,
                        }}
                      >
                        {item?.type}
                      </V.Column>

                      <V.Column
                        minWidth={700 / 5}
                        align="center"
                        crossAlign="center"
                        minHeight={46}
                        css={{ color: colors.grey800, fontSize: 14 }}
                        border={{
                          solid: 1,
                          position: "bottom",
                          color: colors.grey200,
                        }}
                      >
                        {item?.status}
                      </V.Column>

                      <V.Column
                        minWidth={700 / 5}
                        align="center"
                        crossAlign="center"
                        minHeight={46}
                        css={{ color: colors.grey800, fontSize: 14 }}
                        border={{
                          solid: 1,
                          position: "bottom",
                          color: colors.grey200,
                        }}
                      >
                        {useMoment(item?.start_date).format("yyyy.mm.dd")}
                      </V.Column>

                      <V.Column
                        minWidth={700 / 5}
                        align="center"
                        crossAlign="center"
                        minHeight={46}
                        css={{ color: colors.grey800, fontSize: 14 }}
                        border={{
                          solid: 1,
                          position: "bottom",
                          color: colors.grey200,
                        }}
                      >
                        {useMoment(item?.expected_return_date).format(
                          "yyyy.mm.dd"
                        )}
                      </V.Column>

                      <V.Column
                        minWidth={700 / 5}
                        align="center"
                        crossAlign="center"
                        minHeight={46}
                        css={{ color: colors.grey800, fontSize: 14 }}
                        border={{
                          solid: 1,
                          position: "bottom",
                          color: colors.grey200,
                        }}
                      >
                        {item?.actual_return_date
                          ? useMoment(item?.actual_return_date).format(
                              "yyyy.mm.dd"
                            )
                          : "-"}
                      </V.Column>
                    </V.Row>
                  ))}
                </V.Column>
              )}
            </V.Column>
          </V.ScrollDragHorizontal>
        </V.Column>
      </V.Column>
    </View>
  );
}

Vacations.auth = true;
