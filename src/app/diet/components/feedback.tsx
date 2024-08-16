import React, { FormEvent, useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useMoment, useTanstackQuery } from "@/libs/hooks";

//libs
import { Rating } from "@mui/material";
import { V, Button, Txt, Input, TxtSpan, Checkbox, Calendar } from "@/_ui";
import { colors } from "@/libs/themes";

//atoms
import { useSetRecoilState } from "recoil";
import { alartAtom } from "@/app/_layout/atoms/widgets-atom";

//apis
import { createFeedbackDiet } from "@/app/diet/apis/createFeedbackDiet";

//
export default function Feedback() {
  const setIsAlart = useSetRecoilState(alartAtom);
  const { router, axiosInstance } = useCore();
  const { useMutation } = useTanstackQuery();

  const [isValues, setIsValues] = useState({
    rating: 0,
    context: "",
    type: "",
    date: "",
  });

  //
  /// 피드백 제출
  const { mutate: onCreated } = useMutation(
    () =>
      createFeedbackDiet({
        axiosInstance,
        date: isValues.date,
        score: isValues.rating.toString(),
        type: isValues.type,
        content: isValues.context,
      }),
    {
      onSettled: (data) => {
        setIsAlart(true);
        setIsValues({ rating: 0, context: "", type: "", date: "" });
      },
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreated();
  };

  return (
    <V.Column padding={{ horizontal: 20 }} gap={20}>
      <V.Column gap={8}>
        <Txt as="strong">식단 피드백 전달</Txt>
        <Txt color={colors.grey600} size={14}>
          {
            "해당 식단에 대한 피드백을 전달해주시면\n적극적으로 참고해서 개선할게요!"
          }
        </Txt>
      </V.Column>

      <V.Form gap={20} onSubmit={handleSubmit}>
        <V.Column
          gap={10}
          padding={{ all: 18 }}
          backgroundColor="#f8f8f8"
          borderRadius={14}
        >
          <V.Column gap={8}>
            <TxtSpan color="#666" size={15}>
              🍚 급식완료 날짜를 선택하세요
            </TxtSpan>
            {!!isValues.date && (
              <Txt color="#797979" size={14} padding={{ bottom: 20 }}>
                📆 {useMoment(isValues.date).format("yyyy.mm.dd")}으로
                선택되었습니다{" "}
              </Txt>
            )}
          </V.Column>

          <Calendar
            date={isValues.date as any}
            onClick={(date: any) => setIsValues({ ...isValues, date: date })}
            maxDate={new Date()}
          />
        </V.Column>

        <Input label="피드백">
          <Input.Textarea
            placeholder="피드백 내용을 작성하세요"
            rows={5}
            value={isValues.context}
            onChange={(e) =>
              setIsValues({ ...isValues, context: e.target.value })
            }
          />
        </Input>

        <V.Column
          gap={10}
          backgroundColor={colors.grey000}
          borderRadius={12}
          padding={{ all: 20 }}
        >
          <V.Row crossAlign="space-between" align="center">
            <TxtSpan size={14}>평점</TxtSpan>
            <Rating
              name="simple-controlled"
              value={isValues.rating}
              onChange={(event: any, newValue: any) => {
                setIsValues({ ...isValues, rating: newValue });
              }}
            />
          </V.Row>

          <V.Row crossAlign="space-between" align="center">
            <TxtSpan size={14}>타입</TxtSpan>
            <V.Row align="center" gap={10} width="auto">
              <Checkbox
                label={{ title: "조식" }}
                name="조식"
                id="조식"
                checked={isValues.type === "조식"}
                onChange={() => setIsValues({ ...isValues, type: "조식" })}
              />

              <Checkbox
                label={{ title: "중식" }}
                name="중식"
                id="중식"
                checked={isValues.type === "중식"}
                onChange={() => setIsValues({ ...isValues, type: "중식" })}
              />

              <Checkbox
                label={{ title: "석식" }}
                name="석식"
                id="석식"
                checked={isValues.type === "석식"}
                onChange={() => setIsValues({ ...isValues, type: "석식" })}
              />
            </V.Row>
          </V.Row>
        </V.Column>

        <Button
          width="100%"
          type="submit"
          disabled={
            !(
              isValues.date &&
              isValues.context &&
              isValues.rating &&
              isValues.type
            )
          }
        >
          피드백 전송하기
        </Button>
      </V.Form>
    </V.Column>
  );
}
