import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery, useRouteOnload } from "@/libs/hooks";

//atoms
import { useRecoilState } from "recoil";
import { gradeFieldsAtom } from "@/app/education/grade/atoms/grade-fields-atom";

//apis
import { getGradeDetail } from "@/app/education/grade/apis/getGradeDetail";

//
export default function Logic() {
  const { router, axiosInstance } = useCore();
  const { useQuery, queryKey } = useTanstackQuery();
  const [isValues, setIsValues] = useRecoilState(gradeFieldsAtom);

  useRouteOnload(() =>
    setIsValues({
      exam: "",
      korean: "",
      english: "",
      math: "",
      research1: "",
      research2: "",
      history: "",
      foreign: "",
      research1_subject: "",
      research2_subject: "",
      korean_score: "",
      english_score: "",
      math_score: "",
      research1_score: "",
      research2_score: "",
      history_score: "",
      foreign_score: "",
      korean_wrong: "",
      english_wrong: "",
      math_wrong: "",
      research1_wrong: "",
      research2_wrong: "",
      history_wrong: "",
      foreign_wrong: "",
    })
  );

  const { data } = useQuery(
    [queryKey.학습관리.시험성적상세, router.query.id],
    () => getGradeDetail({ axiosInstance, id: router.query.id }),
    {
      onSuccess: (data) => {
        setIsValues({
          ...isValues,
          exam: data?.exam_id,
          korean: data?.korean,
          english: data?.english,
          math: data?.math,
          research1: data?.research1,
          research2: data?.research2,
          history: data?.history,
          foreign: data?.foreign,
          research1_subject:
            data?.research1_subject === "정보없음"
              ? ""
              : data?.research1_subject,
          research2_subject:
            data?.research2_subject === "정보없음"
              ? ""
              : data?.research2_subject,
          korean_score: data?.korean_score,
          english_score: data?.english_score,
          math_score: data?.math_score,
          research1_score: data?.research1_score,
          research2_score: data?.research2_score,
          history_score: data?.history_score,
          foreign_score: data?.foreign_score,
          korean_wrong: data?.korean_wrong,
          english_wrong: data?.english_wrong,
          math_wrong: data?.math_wrong,
          research1_wrong: data?.research1_wrong,
          research2_wrong: data?.research2_wrong,
          history_wrong: data?.history_wrong,
          foreign_wrong: data?.foreign_wrong,
        });
      },

      enabled: !!router.query.id,
    }
  );

  return <></>;
}
