import { useRouter } from "next/router";
import { fontSize, MQ } from "@/libs/themes";
import SEO from "@/seo.config";
import { Txt, V } from "@/_ui";

export default function FailPage() {
  const router = useRouter();
  const { message, contentId } = router.query;

  return (
    <>
      <SEO />
      <V.Section crossAlign="center" align="center">
        <V.Column align="center" maxWidth={500} padding={{ all: 26 }}>
          <img
            width="30px"
            src="https://static.toss.im/3d-emojis/u1F6A8-apng.png"
          />

          <Txt
            as="h4"
            css={{ [MQ[3]]: { fontSize: fontSize.s26 } }}
            margin={{ top: 6, bottom: 20 }}
          >
            결제를 확인하세요
          </Txt>

          {/* <Txt color="#797979">code = {query.code ?? 'UNKNOWN_ERROR'}</Txt> */}
          <Txt color="#797979">{message ?? "알 수 없는 상태입니다"}</Txt>
          <Txt color="#797979">
            해당 페이지는 더이상 사용불가능 합니다
            <br />
            다시 이용해주세요
          </Txt>

          {/* <Row width="auto" gap={10} margin={{ top: 30 }}>
            <Link
              href="https://docs.tosspayments.com/guides/payment-widget/integration"
              target={'_blank'}
              css={{
                padding: 14,
                backgroundColor: colors.blueBg,
                borderRadius: 14,
                color: colors.keyColor,
                fontSize: 15,
              }}
            >
              연동 문서
            </Link>
            <Link
              href="https://discord.gg/A4fRFXQhRu"
              target={'_blank'}
              css={{
                padding: 14,
                backgroundColor: colors.keyColor,
                borderRadius: 14,
                color: '#fff',
                fontSize: 15,
              }}
            >
              실시간 문의
            </Link>
          </Row> */}
        </V.Column>
      </V.Section>
    </>
  );
}
