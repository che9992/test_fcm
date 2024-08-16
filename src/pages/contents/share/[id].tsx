import { useRouter } from "next/router";
import { usePlatformOs } from "@/libs/hooks";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";

//libs
import { LoadingSpinner, Txt, V, Image } from "@/_ui";
import { MQ } from "@/libs/themes";
import { noneImg } from "@/libs/assets/images";

//apis
import { getShareDetailContents } from "@/app/contents/apis/getShareDetailContents";

//components
import InfoBox from "@/app/contents/components/InfoBox";
const ContentsData = dynamic(
  () => import("@/app/contents/components/share/ContentsData"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

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
export default function Detail() {
  const router = useRouter();
  const os = usePlatformOs();
  const { id, userId } = router.query;

  // 데이터
  const { isLoading, data, error } = useQuery(
    ["contents-shate-detail", { ...router.query }],
    () =>
      getShareDetailContents({
        contentId: id,
        userId: userId,
      }),
    { enabled: !!id && !!userId }
  );

  console.log(data);

  if (error) {
    return (
      <V.Column
        align="center"
        crossAlign="center"
        gap={16}
        flex={1}
        minHeight="100vh"
      >
        <LoadingSpinner />

        <Txt size={14} color="#797979">
          데이터 로딩 중 오류가 발생했습니다
        </Txt>
      </V.Column>
    );
  }

  if (isLoading) {
    return (
      <V.Column
        align="center"
        crossAlign="center"
        gap={16}
        flex={1}
        minHeight="100vh"
      >
        <LoadingSpinner />

        <Txt size={14} color="#797979">
          로딩 중 ...
        </Txt>
      </V.Column>
    );
  }

  return (
    <>
      <V.Section>
        <V.Container
          maxWidth={600}
          align="start"
          padding={{ bottom: 30 }}
          gap={20}
        >
          <Image
            source={data?.thumbnail ? data?.thumbnail : noneImg}
            alt={data?.title}
            size={{ maxHeight: 600 }}
            ratio={{ x: 3, y: 4 }}
            borderRadius={0}
            objectFit="cover"
            css={{ [MQ[2]]: { borderRadius: 0 } }}
          />

          {/* 콘텐츠 */}
          <V.Column>
            <ContentsData data={data} />
            <InfoBox />
          </V.Column>
        </V.Container>
      </V.Section>
    </>
  );
}
