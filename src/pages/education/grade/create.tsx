import React, { FormEvent, ReactNode, useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//libs
import { V, Button, Txt, Spacing } from "@/_ui";
import { colors, MQ } from "@/libs/themes";

//apis
import { createGrade } from "@/app/education/grade/apis/createdGrade";
import { updatedGrade } from "@/app/education/grade/apis/updatedGrade";

//atoms
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  alartAtom,
  alartContextAtom,
  loadingAtom,
} from "@/app/_layout/atoms/widgets-atom";
import { gradeFieldsAtom } from "@/app/education/grade/atoms/grade-fields-atom";

//components
import Step1 from "@/app/education/grade/components/Step1";
import Step2 from "@/app/education/grade/components/Step2";
import Step3 from "@/app/education/grade/components/Step3";
import Step4 from "@/app/education/grade/components/Step4";
import Logic from "@/app/education/grade/components/Logic";
import View from "@/app/_layout/components/View";

//
export default function Create() {
  const { router, axiosInstance } = useCore();
  const { useMutation, useQuery } = useTanstackQuery();

  const setIsAlart = useSetRecoilState(alartAtom);
  const setIsLoading = useSetRecoilState(loadingAtom);
  const setIsAlartContext = useSetRecoilState(alartContextAtom);

  const isValues = useRecoilValue(gradeFieldsAtom);

  const [isErr, setIsErr] = useState({
    examErr: false,
    scoreErr: false,
    wrongErr: false,
  });

  const paramsData = {
    exam: isValues.exam,
    korean: isValues.korean,
    english: isValues.english,
    math: isValues.math,
    research1: isValues.research1,
    research2: isValues.research2,
    history: isValues.history,
    foreign: isValues.foreign,
    research1_subject: isValues.research1_subject,
    research2_subject: isValues.research2_subject,
    korean_score: isValues.korean_score,
    english_score: isValues.english_score,
    math_score: isValues.math_score,
    research1_score: isValues.research1_score,
    research2_score: isValues.research2_score,
    history_score: isValues.history_score,
    foreign_score: isValues.foreign_score,
    korean_wrong: isValues.korean_wrong,
    english_wrong: isValues.english_wrong,
    math_wrong: isValues.math_wrong,
    research1_wrong: isValues.research1_wrong,
    research2_wrong: isValues.research2_wrong,
    history_wrong: isValues.history_wrong,
    foreign_wrong: isValues.foreign_wrong,
  };

  // 성공
  const mutateOnSuccess = () => {
    setIsLoading(false);
    setIsErr({ ...isErr, examErr: false, scoreErr: false, wrongErr: false });
    setIsAlart(true);
    setIsAlart(true);
    router.back();
  };

  // 실패 : 에러
  const mutateOnError = (error: any) => {
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsAlart(true);
    setIsAlartContext({
      title: "⛔️ 에러 내용을 확인하세요",
      context: "에러 내용을 확인 후 다시 버튼을 클릭하세요",
    });
    setIsErr({
      ...isErr,
      examErr: error?.response?.data?.exam,
      scoreErr: error?.response?.data?.score_msg,
      wrongErr: error?.response?.data?.wrong_msg,
    });
  };

  //
  /// 추가
  const { mutate: onAdd } = useMutation(
    () => createGrade({ axiosInstance, data: paramsData }),
    {
      onSuccess: (data) => mutateOnSuccess(),
      onError: (error: any) => mutateOnError(error),
    }
  );

  //
  /// 수정
  const { mutate: onUpdate } = useMutation(
    () =>
      updatedGrade({ axiosInstance, id: router.query.id, data: paramsData }),
    {
      onSuccess: (data) => mutateOnSuccess(),
      onError: (error: any) => mutateOnError(error),
    }
  );

  // 제출하기
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (router.query.id) onUpdate();
    else onAdd();
  };

  return (
    <>
      <Logic />
      <View
        appTitle={router.query.id ? "성적수정" : "성적추가"}
        activeCancelModal
        navigator={false}
      >
        <V.Column align="center">
          <V.Form
            onSubmit={handleSubmit}
            maxWidth={600}
            gap={20}
            padding={{ top: 30, bottom: 40, horizontal: 16 }}
            css={{ [MQ[3]]: { paddingTop: 16, paddingBottom: 20, gap: 14 } }}
          >
            <Step1 error={isErr.examErr} />
            <Step2 />
            <Step3 error={isErr.scoreErr} />
            <Step4 error={isErr.wrongErr} />
            <Button
              width="100%"
              type="submit"
              disabled={
                isValues.exam === "" ||
                ((isValues.research1_subject && isValues.research2_subject) !==
                  "" &&
                  isValues.research1_subject === isValues.research2_subject) ||
                (isValues.research1 !== "" &&
                  isValues.research1_subject === "") ||
                (isValues.research2 !== "" &&
                  isValues.research2_subject === "") ||
                isValues.research1_subject === "정보없음" ||
                isValues.research2_subject === "정보없음"
              }
            >
              {router.query.id ? "성적수정" : "성적추가"}
            </Button>
          </V.Form>
        </V.Column>
      </View>
    </>
  );
}

Create.auth = true;

export const BoxShadow = ({
  title,
  description,
  error,
  children,
}: {
  title: string;
  description: string;
  error?: string | boolean;
  children: ReactNode;
}) => (
  <V.Column
    padding={{ vertical: 20, horizontal: 16 }}
    shadow={{ x: 0, y: 2, blur: 20, color: "#eee" }}
    borderRadius={20}
  >
    <V.Column gap={8}>
      <Txt size={17} as="strong" color={error ? colors.red : colors.black100}>
        {title}
      </Txt>

      {!!error ? (
        <Txt size={14} color={colors.red}>
          {error}
        </Txt>
      ) : (
        <Txt size={14} color={colors.grey600}>
          {description}
        </Txt>
      )}
    </V.Column>

    <Spacing size={20} />

    {children}
  </V.Column>
);
