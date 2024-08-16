import { useState } from "react";
import { useMoment, useFileDownload, useTanstackQuery } from "@/libs/hooks";
import { useCore } from "@/libs/provider/useCore";

//apis
import { getDetailLibrary } from "@/app/library/getDetailLibrary";

//libs
import { Divider, V, Image, Txt, TxtSpan, Spacing } from "@/_ui";
import { colors } from "@/libs/themes";

//components
import View from "@/app/_layout/components/View";
import { FileItems } from "@/libs/components/_custom/FileItems";

//
export default function Detail() {
  const { router, axiosInstance } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();
  const [images, setImages] = useState([]);
  //
  //// 상세 데이터
  const { data, isLoading } = useQuery(
    [queryKey.자료실.상세, router.query.id, router.query.libraryId],
    () =>
      getDetailLibrary({
        axiosInstance,
        id: router.query.id || router.query.libraryId,
      }),
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
    <>
      <View
        appTitle="자료실 상세"
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
          <V.Column padding={{ horizontal: 20 }}>
            <Txt size={18} as="h6">
              {data?.article?.title}
            </Txt>
            <Spacing size={8} />
            <TxtSpan size={13}>
              {data?.article?.subject} ˙ {data?.article?.created_by} ˙{" "}
              {useMoment(data?.article?.created_at).format("yyyy.mm.dd")} ˙{" "}
              {data?.article?.views}명 조회
            </TxtSpan>
          </V.Column>

          <Divider size={10} color="#f8f8f8" spacing={{ vertical: 20 }} />

          <V.Column padding={{ horizontal: 20 }}>
            <V.Column gap={15}>
              <TxtSpan color={colors.grey500} size={12}>
                자료 내용
              </TxtSpan>
              <Txt>{data?.article?.content}</Txt>
            </V.Column>

            {images?.length !== 0 && (
              <V.Column gap={20} padding={{ top: 30 }}>
                {images?.map((item: any) => (
                  <Image source={item?.file} alt={item?.title} zoomUp />
                ))}
              </V.Column>
            )}

            {data?.article_files?.length > 0 && (
              <V.Column gap={8} padding={{ top: 30 }}>
                <TxtSpan size={12} color="#aaa">
                  첨부 파일
                </TxtSpan>

                <V.Column gap={6}>
                  {data?.article_files?.map((item: any) => {
                    return (
                      <FileItems
                        key={item?.file}
                        onClick={() =>
                          useFileDownload({
                            file: item?.file,
                            title: item?.title,
                          })
                        }
                      >
                        {item?.title}
                      </FileItems>
                    );
                  })}
                </V.Column>
              </V.Column>
            )}
          </V.Column>
        </V.Column>
      </View>
    </>
  );
}

Detail.auth = true;
