import React, { ChangeEvent, FormEvent, useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//libs
import { Button, Input, Txt, V } from "@/_ui";
import { colors } from "@/libs/themes/colors";

//utils
import { regEx } from "@/libs/utils/regEx";

//apis
import { updatedMyPw } from "@/app/mypage/apis/updatedMyPw";

//atoms
import { alartAtom } from "@/app/_layout/atoms/widgets-atom";
import { useSetRecoilState } from "recoil";

//
export default function ChangePassword() {
  const { axiosInstance } = useCore();
  const { useMutation, queryClient, queryKey } = useTanstackQuery();
  const setIsAlart = useSetRecoilState(alartAtom);

  const [isValues, setIsValues] = useState({
    pw: "",
    newPw: "",
    newPw2: "",
  });
  const [isErr, setIsErr] = useState<boolean | string>(false);

  const { mutate: onUpdate, isLoading } = useMutation(
    () =>
      updatedMyPw({
        axiosInstance,
        old_password: isValues.pw,
        new_password: isValues.newPw2,
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["/accounts/mypage/"]);
        setIsAlart(true);
        setIsErr(false);
        setIsValues({ ...isValues, pw: "", newPw: "", newPw2: "" });
      },
      onError: (err: any) => setIsErr(err.response.data.old_password[0]),
    }
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate();
  };

  return (
    <>
      <V.Column padding={{ horizontal: 6 }}>
        <Txt as="strong">비밀번호 변경</Txt>
        <Txt size={14} color={colors.grey600} margin={{ top: 5 }}>
          비밀번호 변경 시 아래 정보를 입력하세요
        </Txt>
        <V.Form gap={20} margin={{ top: 26 }} onSubmit={onSubmit}>
          <Input label="현재 비밀번호">
            <Input.TextField
              id="a"
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              value={isValues.pw}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, pw: e.target.value })
              }
              error={{
                error:
                  isValues.pw && (!regEx.password.test(isValues.pw) as any),
                message: "영문, 숫자, 특수문자 조합 8자 이상에 맞게 입력하세요",
              }}
            />
          </Input>

          <Input label="새로운 비밀번호">
            <Input.TextField
              id="b"
              type="password"
              placeholder="영문, 숫자, 특수문자 조합 8자 이상 입력하세요"
              value={isValues.newPw}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, newPw: e.target.value })
              }
              error={{
                error:
                  !!isValues.newPw &&
                  (!regEx.password.test(isValues.newPw) ||
                    isValues.pw === isValues.newPw),
                message: (!!isValues.newPw &&
                  (isValues.pw === isValues.newPw
                    ? "현재 비밀번호와 다르게 입력하세요"
                    : "영문, 숫자, 특수문자 조합 8자 이상에 맞게 입력하세요")) as any,
              }}
            />
          </Input>

          <Input label="새로운 비밀번호 확인">
            <Input.TextField
              id="c"
              type="password"
              placeholder="새 비밀번호를 확인하세요 "
              value={isValues.newPw2}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, newPw2: e.target.value })
              }
              error={{
                error: !!isValues.newPw2 && isValues.newPw !== isValues.newPw2,
                message: "새로운 비밀번호가 일치하지 않습니다",
              }}
            />
          </Input>

          <V.Column align="center" gap={14}>
            {isErr && (
              <Txt size={13} color={colors.red}>
                {isErr}
              </Txt>
            )}
            <Button
              type="submit"
              width="100%"
              disabled={
                !isValues.pw ||
                isValues.pw === isValues.newPw ||
                (!!isValues.newPw && !regEx.password.test(isValues.newPw)) ||
                (!!isValues.newPw2 && isValues.newPw !== isValues.newPw2) ||
                isLoading
              }
            >
              {isLoading ? "비밀번호 업데이트 중 ..." : "비밀번호 변경"}
            </Button>
          </V.Column>
        </V.Form>
      </V.Column>
    </>
  );
}
