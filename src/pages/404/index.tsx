import { GetServerSideProps } from "next";
import { NextRouter, useRouter } from "next/router";

import { Button, V, Spacing, Txt } from "@/_ui";
import { MQ, colors, fontSize } from "@/libs/themes";

//
export default function Error() {
  const router: NextRouter = useRouter();

  return (
    <>
      <V.Section>
        <V.Container
          padding={{ horizontal: 26, bottom: 50 }}
          crossAlign="center"
          align="center"
          flex={1}
          height="100%"
          minHeight="100vh"
        >
          <Txt as="h4" css={{ [MQ[3]]: { fontSize: fontSize.s26 } }}>
            페이지를 찾을 수 없습니다
          </Txt>
          <Spacing size={12} />
          <Txt as="p" css={{ color: colors.grey500 }}>
            아래 버튼을 통해 이전페이지로 이동하세요
          </Txt>

          <Spacing size={24} />
          <Button
            buttonColor={colors.keyColor}
            txtColor={colors.white}
            borderRadius={14}
            onClick={() => router.back()}
          >
            뒤로가기
          </Button>
        </V.Container>
      </V.Section>
    </>
  );
}
