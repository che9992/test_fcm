import { GetServerSideProps } from "next";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

//libs
import { Button, Image, Input, Spacing, Txt, TxtTab, V } from "@/_ui";
import { colors, MQ } from "@/libs/themes";

//assets
import { LogoIcon } from "@/libs/assets/icons";

//utils
import { regEx } from "@/libs/utils/regEx";
import { signIn, useSession } from "next-auth/react";

//service
import service from "public/service.json";
import { usePlatformOs } from "@/libs/hooks";

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  const path = context.req.url;
  const fullUrl = `${protocol}://${host}${path}`;

  const userAgent = context.req.headers["user-agent"] || "";

  if (userAgent.includes("KAKAOTALK")) {
    return {
      redirect: {
        destination: `kakaotalk://web/openExternal?url=${encodeURIComponent(
          fullUrl
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

//
export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const os = usePlatformOs();

  const [errMsg, setErrMsg] = useState<null | string | undefined>(null);
  const [isValues, setIsValue] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  //
  // 입력 이벤트
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsValue({ ...isValues, [name]: value });
  };

  //
  // 로그인
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: isValues.email,
      password: isValues.password,
      callbackUrl: "/",
      redirect: status === "authenticated",
    });

    if (result?.ok) return;
    else setErrMsg(result?.error);
  };

  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]);

  return (
    <>
      <V.Section>
        <V.Row height="100%" css={{ flex: 1 }}>
          <V.Column
            width={"100%" as any}
            height="100%"
            minHeight="100vh"
            css={{ [MQ[1]]: { display: "none" } }}
          >
            <Image
              size={{ width: "100%", height: "100vh" }}
              objectFit="cover"
              borderRadius={0}
              source={service.imageUrl}
              alt="에듀셀파"
            />
          </V.Column>

          <V.Column
            align="center"
            crossAlign="center"
            padding={{ vertical: 40, horizontal: 20 }}
            css={{ [MQ[3]]: { justifyContent: "flex-start" } }}
          >
            <V.Column maxWidth={460}>
              <V.Column gap={10}>
                <LogoIcon width="140px" />
                <Txt as="h1" size={20}>
                  {service.category} 서비스에
                  <br />
                  오신 것을 환영합니다 🤔
                </Txt>
              </V.Column>

              {os !== "ios" && (
                <V.Column
                  margin={{ top: 20 }}
                  padding={{ all: 18 }}
                  gap={6}
                  borderRadius={16}
                  backgroundColor="#f8f9fc"
                  border={{ solid: 1, color: "#e2e2e2" }}
                >
                  <Txt color={colors.keyColor} weight="medium" size={16}>
                    앱 설치 이후 알림 권한을 반드시 허용해주세요
                  </Txt>
                  <Txt size={14} color="#777">
                    허용하지 않을 경우 서비스를 정상적으로 제공받을 수 없습니다
                  </Txt>
                </V.Column>
              )}

              <Spacing size={32} />

              <V.Form onSubmit={onSubmit}>
                <Input label="이메일">
                  <Input.TextField
                    type="text"
                    placeholder="이메일을 입력하세요."
                    name="email"
                    value={isValues.email}
                    onChange={handleOnChange}
                  />
                </Input>

                <Spacing size={20} />

                <Input label="비밀번호">
                  <Input.TextField
                    type="password"
                    placeholder="비밀번호 입력하세요."
                    name="password"
                    value={isValues.password}
                    onChange={handleOnChange}
                  />
                </Input>

                <Spacing size={30} />

                {!!errMsg && (
                  <V.Column margin={{ bottom: 12 }} align="center">
                    <Txt color={colors.red} size={13} txtAlign="center">
                      {errMsg}
                    </Txt>
                  </V.Column>
                )}

                <Button
                  type="submit"
                  width="100%"
                  disabled={
                    !isValues.password || !regEx.email.test(isValues.email)
                  }
                >
                  서비스 시작하기
                </Button>
              </V.Form>

              <Spacing size={12} />

              <V.Row crossAlign="space-between">
                <TxtTab
                  color={colors.grey600}
                  onClick={() => router.push("/sign/find-password")}
                >
                  비밀번호 찾기
                </TxtTab>
                <TxtTab
                  color={colors.grey600}
                  onClick={() => router.push("/sign/join-us")}
                >
                  지금 가입하기
                </TxtTab>
              </V.Row>
            </V.Column>
          </V.Column>
        </V.Row>
      </V.Section>
    </>
  );
}

Login.auth = false;
