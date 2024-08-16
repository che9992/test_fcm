import React, { ChangeEvent } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//libs
import { Select } from "@/_ui";
import { BoxShadow } from "@/pages/education/grade/create";

//apis
import { getGradeOptions } from "@/app/education/grade/apis/getGradeOptions";

//atoms
import { useRecoilState } from "recoil";
import { gradeFieldsAtom } from "@/app/education/grade/atoms/grade-fields-atom";

//
export default function Step1({ error }: { error?: boolean | string }) {
  const { axiosInstance, router } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();
  const [isValues, setIsValues] = useRecoilState(gradeFieldsAtom);

  /// 옵션
  const { data: options } = useQuery(
    ["grede-options1-key"],
    () => getGradeOptions({ axiosInstance }),
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return (
    <BoxShadow
      title="시험명을 반드시 선택하세요"
      description="  추가하려는 성적의 시험을 반드시 선택하세요"
      error={error}
    >
      <Select
        placeholder="시험명을 선택하세요"
        value={isValues.exam}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setIsValues({ ...isValues, exam: e.target.value })
        }
        options={options?.exam_choices}
        renderItem={(item) => (
          <option value={item.id} key={item.id}>
            {item.title}
          </option>
        )}
      />
    </BoxShadow>
  );
}
