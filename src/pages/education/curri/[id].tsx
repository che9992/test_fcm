import React, { ReactNode, useState } from "react";
import { useMoment, useTanstackQuery } from "@/libs/hooks";
import { useCore } from "@/libs/provider/useCore";

//libs
import {
  Divider,
  TxtTab,
  V,
  Dialog,
  Spacing,
  Txt,
  TxtSpan,
  Calendar,
} from "@/_ui";
import { colors } from "@/libs/themes";

//apis
import { getDetailCurri } from "@/app/education/curri/apis/getDetailCurri";
import { removeCurri } from "@/app/education/curri/apis/removeCurri";
import { updatedStopCurri } from "@/app/education/curri/apis/updatedStopCurri";
import { updatedFinishCurri } from "@/app/education/curri/apis/updatedFinishCurri";
import { updatedReStartCurri } from "@/app/education/curri/apis/updatedReStartCurri";

//atoms
import { alartAtom } from "@/app/_layout/atoms/widgets-atom";
import { useSetRecoilState } from "recoil";

//components
import CurriMemos from "@/app/education/curri/components/curriMemos";
import View from "@/app/_layout/components/View";

//
export default function ConsoultDetail() {
  const { router, axiosInstance, routePath } = useCore();
  const { queryKey, useQuery, queryClient, useMutation } = useTanstackQuery();

  const setIsAlart = useSetRecoilState(alartAtom);

  const [isDialogOpen, setIsDialogOpen] = useState<
    "삭제" | "완강" | "중단" | "재시작" | false
  >(false);

  const [isDate, setIsDate] = useState({
    finish: "",
    stop: "",
  });

  //
  // 데이터
  const { data, isLoading } = useQuery(
    [queryKey.학습관리.커리큘럼상세, router.query.id],
    () => getDetailCurri({ axiosInstance, id: router.query.id }),
    {
      enabled: !!router.query.id,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  //
  // 완강
  const { mutate: onFinish } = useMutation(
    () =>
      updatedFinishCurri({
        axiosInstance,
        id: router.query.id,
        end_date: isDate.finish,
      }),
    {
      onSuccess: (data) => {
        setIsDialogOpen(false);
        setIsDate({ ...isDate, finish: "" });
        setIsAlart(true);
        queryClient.invalidateQueries([queryKey.학습관리.커리큘럼상세]);
      },
    }
  );

  //
  // 중단
  const { mutate: onStop } = useMutation(
    () =>
      updatedStopCurri({
        axiosInstance,
        id: router.query.id,
        end_date: isDate.stop,
      }),
    {
      onSuccess: (data) => {
        setIsDialogOpen(false);
        setIsDate({ ...isDate, stop: "" });
        setIsAlart(true);
        queryClient.invalidateQueries([queryKey.학습관리.커리큘럼상세]);
      },
    }
  );

  //
  // 재시작
  const { mutate: onReStart } = useMutation(
    () => updatedReStartCurri({ axiosInstance, id: router.query.id }),
    {
      onSuccess: (data) => {
        setIsDialogOpen(false);
        setIsAlart(true);
        queryClient.invalidateQueries([queryKey.학습관리.커리큘럼상세]);
      },
    }
  );

  //
  // 삭제하기
  const { mutate: onDelete } = useMutation(
    () => removeCurri({ axiosInstance, id: router.query.id }),
    {
      onSuccess: (data) => {
        router.back();
        setIsDialogOpen(false);
        setIsAlart(true);
        queryClient.invalidateQueries([queryKey.학습관리.커리큘럼상세]);
      },
    }
  );

  return (
    <>
      <View
        appTitle="커리상세"
        backEvent={() => router.back()}
        loading={isLoading}
        navigator={false}
      >
        <V.Column
          maxWidth={600}
          gap={16}
          padding={{ top: 20, bottom: 40, horizontal: 15 }}
        >
          <BoxShadow>
            <Txt as="strong">
              [{data?.state}] {data?.title}
            </Txt>
            <Spacing size={10} />

            <V.Column gap={3}>
              <V.Row wrap="wrap" gap={6} crossGap={3}>
                <TxtSpan>추가자 : {data?.created_by} | </TxtSpan>

                <TxtSpan>
                  추가일 : {useMoment(data?.created_at).format("yyyy.mm.dd")}
                </TxtSpan>
              </V.Row>

              {!data?.updated_by && (
                <V.Row wrap="wrap" gap={6} crossGap={3}>
                  <TxtSpan>마지막 수정자 : {data?.updated_by} | </TxtSpan>

                  <TxtSpan>
                    마지막 수정일 :{" "}
                    {useMoment(data?.updated_at).format("yyyy.mm.dd")}
                  </TxtSpan>
                </V.Row>
              )}
            </V.Column>

            {data?.is_editable && (
              <>
                <Divider
                  size={1}
                  color="#eee"
                  spacing={{ top: 20, bottom: 10 }}
                />

                <V.Row gap={8}>
                  {data?.state !== "완강" && (
                    <>
                      {data?.state === "진행 중" && (
                        <TxtTab
                          color={colors.red}
                          padding={{ all: 6 }}
                          onClick={() => setIsDialogOpen("완강")}
                        >
                          완강
                        </TxtTab>
                      )}

                      <TxtTab
                        color={colors.blue}
                        padding={{ all: 6 }}
                        onClick={() => {
                          if (data?.state === "중단") {
                            setIsDialogOpen("재시작");
                          } else {
                            setIsDialogOpen("중단");
                          }
                        }}
                      >
                        {data?.state === "중단" ? "재시작" : "중단"}
                      </TxtTab>
                    </>
                  )}

                  <TxtTab
                    color="#aaa"
                    padding={{ all: 6 }}
                    onClick={() =>
                      router.push({
                        pathname:
                          routePath.서비스.학습관리.커리큘럼 + "/create",
                        query: { id: data?.id },
                      })
                    }
                  >
                    수정
                  </TxtTab>
                  <TxtTab
                    color="#aaa"
                    padding={{ all: 6 }}
                    onClick={() => setIsDialogOpen("삭제")}
                  >
                    삭제
                  </TxtTab>
                </V.Row>
              </>
            )}
          </BoxShadow>

          {/* 분석내역 */}
          <BoxShadow>
            <Txt as="strong" size={16}>
              분석 내역
            </Txt>

            <Spacing size={24} />

            <V.Column gap={18}>
              {[
                { type: "과목", value: data?.subject },
                { type: "영역", value: data?.section },
                { type: "제목", value: data?.title },
                { type: "저자", value: data?.author },
                { type: "시작일", value: data?.start_date },
                { type: "종료일", value: data?.end_date },
                { type: "상태", value: data?.state },
              ].map((item) => (
                <V.Row
                  align="center"
                  crossAlign="space-between"
                  key={item.type}
                >
                  <TxtSpan size={14} color="#999">
                    {item.type}
                  </TxtSpan>

                  <TxtSpan size={15}>{item.value ? item.value : "-"}</TxtSpan>
                </V.Row>
              ))}
            </V.Column>
          </BoxShadow>

          {/* 메모 */}
          <BoxShadow>
            <CurriMemos />
          </BoxShadow>
        </V.Column>
      </View>

      {/* 재시작 alart 모달 */}
      <Dialog
        title="재시작 하시겠습니까?"
        description={`확인 버튼 클릭 시\n커리큘럼이 재시작됩니다`}
        open={isDialogOpen === "재시작"}
        onCancel={() => {
          setIsDialogOpen(false);
          setIsDate({ ...isDate, finish: "", stop: "" });
        }}
        tabs={[{ name: "재시작하기", onClick: () => onReStart() }]}
      />

      {/* 완강 alart 모달 */}
      <Dialog
        title="완강 처리하시겠습니까?"
        description={`완강일을 선택하세요\n완강일은 시작일보다 빠를 순 없어요\n(현재 시작일 : ${data?.start_date})`}
        open={isDialogOpen === "완강"}
        onCancel={() => {
          setIsDialogOpen(false);
          setIsDate({ ...isDate, finish: "", stop: "" });
        }}
        tabs={[
          {
            name:
              (!!isDate.finish
                ? useMoment(isDate.finish).format("yyyy.mm.dd") + "로"
                : "") + " 완강하기",
            disabled: !isDate.finish,
            onClick: () => onFinish(),
          },
        ]}
      >
        <>
          <Spacing size={20} />
          <Calendar
            date={isDate.finish as any}
            minDate={new Date(data?.start_date)}
            onClick={(date: any) => setIsDate({ ...isDate, finish: date })}
          />
        </>
      </Dialog>

      {/* 중단 alart 모달 */}
      <Dialog
        title="중단 처리하시겠습니까?"
        description={`중단일을 선택하세요\n중단일은 시작일보다 빠를 순 없어요\n(현재 시작일 : ${data?.start_date})`}
        open={isDialogOpen === "중단"}
        onCancel={() => {
          setIsDialogOpen(false);
          setIsDate({ ...isDate, finish: "", stop: "" });
        }}
        tabs={[
          {
            name:
              (!!isDate.stop
                ? useMoment(isDate.stop).format("yyyy.mm.dd") + "로"
                : "") + " 중단하기",
            disabled: !isDate.stop,
            onClick: () => onStop(),
          },
        ]}
      >
        <>
          <Spacing size={20} />
          <Calendar
            date={isDate.stop as any}
            minDate={new Date(data?.start_date)}
            onClick={(date: any) => setIsDate({ ...isDate, stop: date })}
          />
        </>
      </Dialog>

      {/* 삭제 alart 모달 */}
      <Dialog
        title="삭제 처리하시겠습니까?"
        description={`한번 삭제된 내용은\n복구가 불가능합니다`}
        open={isDialogOpen === "삭제"}
        onCancel={() => setIsDialogOpen(false)}
        tabs={[{ name: "삭제하기", onClick: () => onDelete() }]}
      />
    </>
  );
}

ConsoultDetail.auth = true;

const BoxShadow = ({ children }: { children: ReactNode }) => (
  <V.Column
    shadow={{ x: 0, y: 2, blur: 20, color: "#eee" }}
    padding={{ all: 20 }}
    borderRadius={20}
  >
    {children}
  </V.Column>
);
