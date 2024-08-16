import React, { ChangeEvent, useCallback, useEffect } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//libs
import { BoxShadow } from "@/pages/education/grade/create";
import { Input, Select, Spacing, V } from "@/_ui";

//apis
import { getGradeOptions } from "@/app/education/grade/apis/getGradeOptions";

//atoms
import { useRecoilState } from "recoil";
import { gradeFieldsAtom } from "@/app/education/grade/atoms/grade-fields-atom";

//
export default function Step2({ error }: { error?: boolean | string }) {
  const { router, axiosInstance } = useCore();
  const { useQuery } = useTanstackQuery();
  const [isValues, setIsValues] = useRecoilState(gradeFieldsAtom);

  /// 옵션
  const { data: options } = useQuery(
    ["grade-add-option"],
    () => getGradeOptions({ axiosInstance }),
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  // 핸들러
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, "");
      const name = e.target.name;
      const numericValue = parseInt(value, 10);

      if (numericValue === 0) {
        setIsValues({ ...isValues, [name]: "1" });
      } else {
        setIsValues({ ...isValues, [name]: value });
      }
    },
    [isValues]
  );

  //
  useEffect(() => {
    if (!isValues.research1) {
      setIsValues({ ...isValues, research1_subject: "" });
    }
    if (!isValues.research2) {
      setIsValues({ ...isValues, research2_subject: "" });
    }
  }, [isValues.research1, isValues.research2]);

  return (
    <BoxShadow
      title="등급을 입력하세요"
      description="   각 과목의 등급은 자유롭게 입력하세요"
      error={error}
    >
      <V.Row gap={14} crossGap={16} wrap="wrap">
        {[
          { label: "국어", name: "korean", value: isValues.korean },
          { label: "수학", name: "math", value: isValues.math },
          { label: "영어", name: "english", value: isValues.english },
          { label: "탐구1", name: "research1", value: isValues.research1 },
          { label: "탐구2", name: "research2", value: isValues.research2 },
          { label: "한국사", name: "history", value: isValues.history },
          { label: "제2외", name: "foreign", value: isValues.foreign },
        ].map((item: any) => (
          <Input label={item.label} maxWidth={50} key={item.label}>
            <Input.TextField
              name={item.name}
              maxLength={1}
              placeholder="-"
              css={{ textAlign: "center" }}
              value={item.value}
              onChange={(e) => handleOnChange(e)}
            />
          </Input>
        ))}
      </V.Row>

      {/* 탐구 옵션 */}
      {!!isValues.research1 && (
        <>
          <Spacing size={20} />
          <Select
            label="탐구1 선택"
            placeholder="탐구 과목1을 선택하세요"
            value={isValues.research1_subject}
            error={{
              error:
                !!isValues.research1_subject &&
                isValues.research1_subject === isValues.research2_subject,
            }}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setIsValues({ ...isValues, research1_subject: e.target.value })
            }
            options={options?.subject_choices}
            renderItem={(item) => (
              <option value={item.value} key={item}>
                {item.display_name}
              </option>
            )}
          />
        </>
      )}

      {!!isValues.research2 && (
        <>
          <Spacing size={18} />
          <Select
            label="탐구2 선택"
            placeholder="탐구 과목2을 선택하세요"
            value={isValues.research2_subject}
            error={{
              error:
                !!isValues.research2_subject &&
                isValues.research1_subject === isValues.research2_subject,
              message: "탐구1 , 탐구2의 선택과목은 동일할 수 없습니다",
            }}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setIsValues({ ...isValues, research2_subject: e.target.value })
            }
            options={options?.subject_choices}
            renderItem={(item) => (
              <option value={item.value} key={item}>
                {item.display_name}
              </option>
            )}
          />
        </>
      )}
    </BoxShadow>
  );
}
