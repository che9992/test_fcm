import React, { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";

//libs
import { TouchableOpacity, V, Spacing, Txt } from "@/_ui";
import { BackIcon } from "@/libs/assets/icons";
import { fontSize, colors, MQ } from "@/libs/themes";

//atoms
import { useRecoilValue, useSetRecoilState } from "recoil";
import { joinFieldAtom } from "@/app/joinUs/atoms/join-field-atom";
import {
  alartAtom,
  alartContextAtom,
  loadingAtom,
} from "@/app/_layout/atoms/widgets-atom";

//apis
import { createdJoinUs } from "@/app/joinUs/apis/createdJoinUs";
import { getJoinUsOptions } from "@/app/joinUs/apis/getJoinUsOptions";

//components
import JoinStep1 from "@/app/joinUs/components/JoinStep1";
import JoinLogic from "@/app/joinUs/components/JoinLogic";
import JoinStep2 from "@/app/joinUs/components/JoinStep2";
import JoinStep3 from "@/app/joinUs/components/JoinStep3";
import JoinStep4 from "@/app/joinUs/components/JoinStep4";

//
export default function JoinUs() {
  JoinLogic();
  const router = useRouter();
  const [isStep, setIsStep] = useState(1);

  const setIsAlart = useSetRecoilState(alartAtom);
  const setIsContextAlart = useSetRecoilState(alartContextAtom);
  const setIsLoading = useSetRecoilState(loadingAtom);

  const isValues = useRecoilValue(joinFieldAtom);

  //
  // 스탭핸들러
  const onStepNext = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsStep(isStep + 1);
  }, [isStep]);

  const { mutate: onCreate } = useMutation(
    () =>
      createdJoinUs({
        picture: isValues.profileImg,
        email: isValues.email,
        password: isValues.password2,
        name: isValues.username,
        student_mobile: isValues.phoneNumber.replace(/-/g, ""),
        birthday: isValues.birth,
        zip_code: isValues.post,
        address: isValues.address,
        detailed_address: isValues.address2,

        father_name: isValues.fatherName,
        father_mobile: isValues.fatherTel.replace(/-/g, ""),
        mother_name: isValues.motherName,
        mother_mobile: isValues.motherTel.replace(/-/g, ""),
        school_year: isValues.schoolYear,
        origin_school: isValues.shcoolName,

        exam_apply: isValues.exam,
        korean: isValues.koelang,
        math: isValues.math,
        english: isValues.eng,
        research1: isValues.exploration1,
        research2: isValues.exploration2,

        korean_type: isValues.korlangSubject,
        math_type: isValues.mathSubject,
        research1_subject: isValues.exploration1Subject,
        research2_subject: isValues.exploration2Subject,

        kor_consul: isValues.korlangCounsel,
        math_consul: isValues.mathCounsel,
        eng_consul: isValues.engCounsel,
        admission_date: isValues.starting,

        to_kor_teacher: isValues.sendKorlang,
        to_math_teacher: isValues.sendMath,
        to_eng_teacher: isValues.sendEng,
      }),
    {
      onSuccess: (data) => {
        router.push("/");
        setIsLoading(false);
        setIsAlart(true);
        setIsContextAlart({
          title: "👏 회원가입이 완료되었습니다.",
          context: "관리자 승인 후 서비스 이용이 가능합니다.",
        });
      },
    }
  );

  //
  // 가입하기
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    onCreate();
  };

  //
  // 옵션
  const { data: options } = useQuery(["join-options"], () =>
    getJoinUsOptions()
  );

  return (
    <>
      <V.Section>
        <V.Form
          onSubmit={onSubmit}
          maxWidth={500}
          padding={{ top: 50, bottom: 40, horizontal: 10 }}
          css={{ [MQ[3]]: { paddingTop: 20 } }}
        >
          <V.Row crossAlign="space-between" align="center">
            <TouchableOpacity
              padding={{ all: 8 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                if (isStep === 1) router.push("/");
                else setIsStep(isStep - 1);
              }}
            >
              <BackIcon fill={colors.grey800} width="22px" />
            </TouchableOpacity>

            <V.Row width="auto" gap={3} margin={{ right: 10 }}>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <V.Container
                    key={i}
                    minWidth={15}
                    minHeight={10}
                    backgroundColor={
                      isStep === i + 1 ? colors.keyColor : colors.grey200
                    }
                    borderRadius={1000}
                  />
                ))}
            </V.Row>
          </V.Row>

          <Spacing size={16} />

          <V.Column gap={26} padding={{ horizontal: 10 }}>
            <V.Column gap={8}>
              <Txt as="h1" css={{ fontSize: fontSize.s20 }}>
                {isStep === 1 && "개인정보를 입력하세요"}
                {isStep === 2 && "보호자 및 학업 정보를 입력하세요"}
                {isStep === 3 && "과목 및 상담에 대해 확인하세요"}
                {isStep === 4 && "과목별 상담 필요내용 입력"}
              </Txt>

              <Txt css={{ color: colors.grey700 }}>
                {isStep === 1 &&
                  "아래 정보들을 반드시 정확히 입력하고 이동하세요"}
                {isStep === 2 &&
                  "아버지 또는 어머니의 정보를 반드시 정확히 입력하세요"}
                {isStep === 3 &&
                  "아래 선택사항 중 탐구 과목은 중복선택이 불가합니다"}
                {isStep === 4 &&
                  "아래 내용 입력 및 약관에 동의 후\n가입을 마무리하세요"}
              </Txt>
            </V.Column>

            {isStep === 1 && <JoinStep1 onStepNext={onStepNext} />}
            {isStep === 2 && (
              <JoinStep2 onStepNext={onStepNext} options={options} />
            )}
            {isStep === 3 && (
              <JoinStep3 onStepNext={onStepNext} options={options} />
            )}
            {isStep === 4 && <JoinStep4 />}
          </V.Column>
        </V.Form>
      </V.Section>
    </>
  );
}

JoinUs.auth = false;
