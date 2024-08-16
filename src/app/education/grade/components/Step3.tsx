import React, { ChangeEvent, useCallback } from "react";

//libs
import { BoxShadow } from "@/pages/education/grade/create";
import { Input, V } from "@/_ui";

//atoms
import { useRecoilState } from "recoil";
import { gradeFieldsAtom } from "@/app/education/grade/atoms/grade-fields-atom";

//
export default function Step3({ error }: { error?: boolean | string }) {
  const [isValues, setIsValues] = useRecoilState(gradeFieldsAtom);

  // 핸들러
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, "");
      const name = e.target.name;
      const numericValue = parseInt(value, 10);

      if (numericValue > 100) {
        setIsValues({ ...isValues, [name]: "100" });
      } else {
        setIsValues({ ...isValues, [name]: value });
      }
    },
    [isValues]
  );

  return (
    <BoxShadow
      title="원점수를 입력하세요"
      description="각 과목의 원점수는 자유롭게 입력하세요"
      error={error}
    >
      <V.Row gap={14} crossGap={16} wrap="wrap">
        {[
          { label: "국어", name: "korean_score", value: isValues.korean_score },
          { label: "수학", name: "math_score", value: isValues.math_score },
          {
            label: "영어",
            name: "english_score",
            value: isValues.english_score,
          },
          {
            label: "탐구1",
            name: "research1_score",
            value: isValues.research1_score,
          },
          {
            label: "탐구2",
            name: "research2_score",
            value: isValues.research2_score,
          },
          {
            label: "한국사",
            name: "history_score",
            value: isValues.history_score,
          },
          {
            label: "제2외",
            name: "foreign_score",
            value: isValues.foreign_score,
          },
        ].map((item: any) => (
          <Input label={item.label} maxWidth={50} key={item.label}>
            <Input.TextField
              name={item.name}
              maxLength={3}
              placeholder="-"
              css={{ textAlign: "center" }}
              value={item.value}
              onChange={(e) => handleOnChange(e)}
            />
          </Input>
        ))}
      </V.Row>
    </BoxShadow>
  );
}
