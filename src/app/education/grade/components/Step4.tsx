import React, { ChangeEvent } from "react";

//libs
import { BoxShadow } from "@/pages/education/grade/create";
import { Input, V } from "@/_ui";

//atoms
import { useRecoilState } from "recoil";
import { gradeFieldsAtom } from "@/app/education/grade/atoms/grade-fields-atom";

//
export default function Step4({ error }: { error?: boolean | string }) {
  const [isValues, setIsValues] = useRecoilState(gradeFieldsAtom);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setIsValues({ ...isValues, [name]: value });
  };

  return (
    <BoxShadow
      title="틀린문제를 입력하세요"
      description={`각 과목의 틀린문제는 자유롭게 입력하세요\n단, 틀린 문제(1~45)는 쉼표(,)로 구분해주세요 참고)1,3,7,10`}
      error={error}
    >
      <V.Column gap={18} padding={{ top: 6 }}>
        {[
          { label: "국어", name: "korean_wrong", value: isValues.korean_wrong },
          { label: "수학", name: "math_wrong", value: isValues.math_wrong },
          {
            label: "영어",
            name: "english_wrong",
            value: isValues.english_wrong,
          },
          {
            label: "탐구1",
            name: "research1_wrong",
            value: isValues.research1_wrong,
          },
          {
            label: "탐구2",
            name: "research2_wrong",
            value: isValues.research2_wrong,
          },
          {
            label: "한국사",
            name: "history_wrong",
            value: isValues.history_wrong,
          },
          {
            label: "제2외",
            name: "foreign_wrong",
            value: isValues.foreign_wrong,
          },
        ].map((item: any) => (
          <Input label={item?.label} key={item.label}>
            <Input.TextField
              placeholder={`${item.label} 틀린문제를 입력하세요`}
              name={item.name}
              value={item.value}
              onChange={handleOnChange}
            />
          </Input>
        ))}
      </V.Column>
    </BoxShadow>
  );
}
