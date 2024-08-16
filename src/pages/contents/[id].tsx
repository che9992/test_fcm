import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//libs
import { V, Image } from "@/_ui";
import { MQ } from "@/libs/themes";

//apis
import { getDetailContent } from "@/app/contents/apis/getDetailContents";

//components
import ContentsData from "@/app/contents/components/ContentsData";
import InfoBox from "@/app/contents/components/InfoBox";
import View from "@/app/_layout/components/View";

//assets
import { noneImg } from "@/libs/assets/images";

//
export default function Detail() {
  const { router, axiosInstance } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();

  // 데이터
  const { isLoading, data } = useQuery(
    [queryKey.콘텐츠.상세, router.query.id],
    () => getDetailContent({ axiosInstance, id: router.query.id }),
    {
      enabled: !!router.query.id,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return (
    <View
      appTitle="콘텐츠 상세"
      loading={isLoading}
      backEvent={() => router.back()}
      navigator={false}
    >
      <V.Row
        maxWidth={900}
        align="start"
        padding={{ vertical: 50 }}
        gap={20}
        css={{ [MQ[2]]: { flexDirection: "column", padding: "0 0  40px" } }}
      >
        <V.Column maxWidth={600} css={{ [MQ[2]]: { maxWidth: "100%" } }}>
          <Image
            source={data?.thumbnail ? data?.thumbnail : noneImg}
            alt={data?.title}
            size={{ maxHeight: 600 }}
            ratio={{ x: 3, y: 4 }}
            borderRadius={0}
            objectFit="cover"
            css={{ [MQ[2]]: { borderRadius: 0 } }}
          />
        </V.Column>

        {/* 콘텐츠 */}
        <V.Column>
          <ContentsData data={data} />
          <InfoBox />
        </V.Column>
      </V.Row>
    </View>
  );
}
Detail.auth = true;
