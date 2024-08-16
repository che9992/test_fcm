import React, { FormEvent, useState } from "react";
import { NextRouter, useRouter } from "next/router";

//assets
import { BackIcon } from "@/libs/assets/icons";

//libs
import { Button, Input, Spacing, TouchableOpacity, Txt, V } from "@/_ui";
import { colors, fontSize, MQ } from "@/libs/themes";

//atoms
import { useSetRecoilState } from "recoil";
import { alartAtom, alartContextAtom } from "@/app/_layout/atoms/widgets-atom";

//utils
import { regEx } from "@/libs/utils/regEx";
import axios from "@/app/_layout/apis/axios";

//
export default function FindPassword() {
  const router: NextRouter = useRouter();

  const [email, setEmail] = useState<string>("");
  const [errMsg, setErrMsg] = useState<boolean>(false);

  const setIsAlart = useSetRecoilState(alartAtom);
  const setIsContextAlart = useSetRecoilState(alartContextAtom);

  // 제출 버튼 핸들러
  const onSubmitHandler = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    await axios
      .post("/accounts/password_reset/", { email: email })
      .then((res) => {
        router.push("/");
        setIsAlart(true);
        setIsContextAlart({
          title: "📧 임시 비밀번호가 전송되었습니다.",
          context: "입력하신 이메일을 통해 임시 비밀번호를 확인하세요!",
        });
      })
      .catch((err) => {
        console.warn("비밀번호 찾기 실패", err);
        setErrMsg(false);
      });
  };

  return (
    <V.Section>
      <V.Column
        maxWidth={500}
        padding={{ top: 50, bottom: 40, horizontal: 10 }}
        css={{ [MQ[3]]: { paddingTop: 20 } }}
      >
        <TouchableOpacity padding={{ all: 8 }} onClick={() => router.push("/")}>
          <BackIcon fill={colors.grey800} width="22px" />
        </TouchableOpacity>

        <Spacing size={16} />

        <V.Column padding={{ horizontal: 10 }}>
          <Txt as="h1" css={{ fontSize: fontSize.s20 }}>
            비밀번호를 잊으셨나요?
          </Txt>

          <Spacing size={14} />

          <Txt
            css={{ color: colors.grey700 }}
          >{`이메일 주소를 입력하시면 새로운 비밀번호를\n설정하는 절차를 이메일로 보내드리겠습니다.`}</Txt>

          <Spacing size={30} />

          <V.Form onSubmit={onSubmitHandler} gap={30}>
            <Input label="이메일">
              <Input.TextField
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Input>

            <Button
              type="submit"
              width="100%"
              disabled={!regEx.email.test(email)}
            >
              비밀번호 찾기
            </Button>
          </V.Form>

          {errMsg && (
            <Txt size={13} color={colors.red}>
              이메일을 다시 확인해주세요
            </Txt>
          )}
        </V.Column>
      </V.Column>
    </V.Section>
  );
}

FindPassword.auth = false;
