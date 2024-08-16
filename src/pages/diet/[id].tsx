import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery, useState } from "@/libs/hooks";

import { Divider, V } from "@/_ui";

//apis
import { getDetailDiet } from "@/app/diet/apis/getDetailDiet";

//components
import Feedback from "@/app/diet/components/feedback";
import TitleBox from "@/app/diet/components/TitleBox";
import ContentBox from "@/app/diet/components/ContentBox";
import View from "@/app/_layout/components/View";

//
export default function Detail() {
  const { router, axiosInstance } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();
  const [images, setImages] = useState([]);

  //
  //// 상세 데이터
  const { data, isLoading } = useQuery(
    [queryKey.식단표.상세, router.query.id],
    () => getDetailDiet({ axiosInstance, id: router.query.id }),
    {
      onSuccess: (data) => {
        if (data?.article_files) {
          const filteredImages = data.article_files
            .flat()
            .filter((file: any) => {
              const fileExtension = file.file.split(".").pop().toLowerCase();
              return (
                fileExtension === "jpg" ||
                fileExtension === "png" ||
                fileExtension === "jpeg"
              );
            });
          setImages(filteredImages);
        }
      },
      refetchOnWindowFocus: false,
      enabled: !!router.query.id,
    }
  );

  return (
    <View
      appTitle="식단 상세"
      backEvent={() => router.back()}
      navigator={false}
      backgroundColor="#f8f9fc"
      loading={isLoading}
      borderBottom="1px solid #eee"
    >
      <V.Column
        maxWidth={600}
        gap={16}
        padding={{ top: 30, bottom: 40 }}
        backgroundColor="#fff"
        height="100%"
        flex={1}
      >
        <TitleBox data={data?.article} />

        <Divider size={10} color="#f8f8f8" spacing={{ vertical: 20 }} />

        <ContentBox data={data} images={images} />

        <Divider size={10} color="#f8f8f8" spacing={{ vertical: 20 }} />

        {/* 후기 작성 */}
        <Feedback />
      </V.Column>
    </View>
  );
}

Detail.auth = true;
