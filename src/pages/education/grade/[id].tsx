import React, { ReactNode, useCallback } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useMoment, useTanstackQuery } from "@/libs/hooks";

//components
import { Dialog, Divider, Spacing, Txt, TxtSpan, TxtTab, V } from "@/_ui";

//apis
import { getGradeDetail } from "@/app/education/grade/apis/getGradeDetail";
import { removeGrade } from "@/app/education/grade/apis/removeGrade";

//atoms
import { useRecoilState, useSetRecoilState } from "recoil";
import { alartAtom, deleteOpenAtom } from "@/app/_layout/atoms/widgets-atom";

//components
import View from "@/app/_layout/components/View";

//
export default function CurriDetail() {
  const { router, axiosInstance, routePath } = useCore();
  const { queryKey, useQuery, useMutation } = useTanstackQuery();
  const setIsAlart = useSetRecoilState(alartAtom);
  const [isDelete, setIsDelete] = useRecoilState(deleteOpenAtom);

  //
  // 데이터
  const { data, isLoading } = useQuery(
    [queryKey.학습관리.시험성적상세, router.query.id],
    () => getGradeDetail({ axiosInstance, id: router.query.id }),
    {
      enabled: !!router.query.id,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  // 시험성적 > 삭제하기
  const { mutate: onDelete } = useMutation(
    () => removeGrade({ axiosInstance, id: router.query.id }),
    {
      onSuccess: (data) => {
        setIsDelete(false);
        setIsAlart(true);
        router.back();
      },
    }
  );

  //
  /// 다이아로그 닫기
  const handleCloseDialog = useCallback(() => setIsDelete(false), [isDelete]);

  // 등급 및 원점수
  const levelList = [
    { subject: "국어", level: data?.korean, point: data?.korean_score },
    { subject: "수학", level: data?.math, point: data?.math_score },
    { subject: "영어", level: data?.english, point: data?.english_score },
    {
      subject: "탐구1",
      detailSubject: data?.research1_subject,
      level: data?.research1,
      point: data?.research1_score,
    },
    {
      subject: "탐구2",
      detailSubject: data?.research2_subject,
      level: data?.research2,
      point: data?.research2_score,
    },
    { subject: "한국사", level: data?.history, point: data?.history_score },
    { subject: "제2외국어", level: data?.foreign, point: data?.foreign_score },
  ];

  //틀린문제
  const mistakeList = [
    {
      subject: "국어",
      mistake: data?.korean_wrong_array,
    },
    {
      subject: "수학",
      mistake: data?.math_wrong_array,
    },
    {
      subject: "영어",
      mistake: data?.english_wrong_array,
    },
    {
      subject: "탐구1",
      detailSubject: data?.research1_subject,
      mistake: data?.research1_wrong_array,
    },
    {
      subject: "탐구2",
      detailSubject: data?.research2_subject,
      mistake: data?.research2_wrong_array,
    },
    {
      subject: "한국사",
      mistake: data?.history_wrong_array,
    },
    {
      subject: "제2외국어",
      mistake: data?.foreign_wrong_array,
    },
  ];

  return (
    <>
      <View
        appTitle="성적상세"
        backEvent={() => router.back()}
        loading={isLoading}
        navigator={false}
      >
        <V.Column
          gap={20}
          maxWidth={600}
          padding={{ top: 20, bottom: 40, horizontal: 15 }}
        >
          <BoxShadow>
            <Txt as="strong">{data?.exam}</Txt>
            <Spacing size={10} />

            <V.Column gap={3}>
              <V.Row wrap="wrap" gap={6} crossGap={3}>
                <TxtSpan>추가자 : {data?.created_by} | </TxtSpan>

                <TxtSpan>
                  추가일 : {useMoment(data?.created_at).format("yyyy.mm.dd")}
                </TxtSpan>
              </V.Row>

              {data?.updated_by && (
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
                  <TxtTab
                    color="#aaa"
                    padding={{ all: 6 }}
                    onClick={() =>
                      router.push({
                        pathname: routePath.서비스.학습관리.시험 + "/create",
                        query: { id: data?.id },
                      })
                    }
                  >
                    수정
                  </TxtTab>

                  <TxtTab
                    color="#aaa"
                    padding={{ all: 6 }}
                    onClick={() => setIsDelete(true)}
                  >
                    삭제
                  </TxtTab>
                </V.Row>
              </>
            )}
          </BoxShadow>

          <BoxShadow>
            <Txt as="strong" size={16}>
              등급 및 원점수
            </Txt>

            <Spacing size={24} />

            <V.Column gap={18}>
              {levelList.map((item) => (
                <V.Row crossAlign="space-between" key={item.subject}>
                  <V.Row width="auto" gap={6}>
                    <TxtSpan size={14} color="#999">
                      {item.subject}
                    </TxtSpan>
                    {item.detailSubject && (
                      <TxtSpan color="#999">({item.detailSubject})</TxtSpan>
                    )}
                  </V.Row>
                  <V.Row gap={8} width="auto">
                    <TxtSpan size={15}>
                      {item?.level ? `${item?.level}등급` : "-"}
                    </TxtSpan>
                    <TxtSpan size={15}>
                      {item?.point ? `(${item?.point}점)` : "(-)"}
                    </TxtSpan>
                  </V.Row>
                </V.Row>
              ))}
            </V.Column>
          </BoxShadow>

          <BoxShadow>
            <Txt as="strong" size={16}>
              틀린 문제
            </Txt>

            <Spacing size={24} />

            <V.Column gap={18}>
              {mistakeList.map((item) => (
                <V.Row crossAlign="space-between" gap={20} key={item.subject}>
                  <Txt
                    color="#888"
                    size={14}
                    whiteSpace="nowrap"
                    css={{ minWidth: 110 }}
                  >
                    {item.subject}

                    {item.detailSubject && (
                      <TxtSpan color="#aaa" padding={{ left: 4 }}>
                        ({item.detailSubject})
                      </TxtSpan>
                    )}
                  </Txt>

                  {!!item.mistake ? (
                    <V.Row
                      wrap="wrap"
                      gap={7}
                      crossGap={2}
                      width="auto"
                      crossAlign="end"
                    >
                      {item.mistake.map((item: any) => (
                        <TxtSpan size={14} className="value">
                          {item}번
                        </TxtSpan>
                      ))}
                    </V.Row>
                  ) : (
                    <TxtSpan size={14} className="value">
                      -
                    </TxtSpan>
                  )}
                </V.Row>
              ))}
            </V.Column>
          </BoxShadow>
        </V.Column>
      </View>

      {/* 삭제 alart 모달 */}
      <Dialog
        title="삭제 하시겠습니까?"
        description={`한번 삭제된 내용은 \n복구가 불가합니다.`}
        open={isDelete}
        onCancel={handleCloseDialog}
        tabs={[{ name: "성적 삭제", onClick: () => onDelete() }]}
      />
    </>
  );
}

CurriDetail.auth = true;

const BoxShadow = ({ children }: { children: ReactNode }) => (
  <V.Column
    shadow={{ x: 0, y: 2, blur: 20, color: "#eee" }}
    padding={{ all: 20 }}
    borderRadius={20}
  >
    {children}
  </V.Column>
);
