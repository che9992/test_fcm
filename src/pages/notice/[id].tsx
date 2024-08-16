import { useState } from "react";
import { useMoment } from "@/libs/hooks";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { useFileDownload } from "@/libs/hooks/useFileDownload";

//apis
import { getDetailNotice } from "@/app/notice/getDetailNotice";

//libs
import { V, Spacing, Txt, TxtSpan, Divider, Image } from "@/_ui";
import { colors } from "@/libs/themes";

//components
import { FileItems } from "@/libs/components/_custom/FileItems";
import View from "@/app/_layout/components/View";

//
export default function Detail() {
  const { router, axiosInstance } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();
  const [images, setImages] = useState([]);

  //
  //// 상세 데이터
  const { data, isLoading } = useQuery(
    [queryKey.공지사항.상세, router.query.id, router.query.noticeId],
    () =>
      getDetailNotice({
        axiosInstance,
        id: router.query.noticeId || router.query.id,
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
        appTitle="공지상세"
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
              {data?.article?.created_by} ˙{" "}
              {useMoment(data?.article?.created_at).format("yyyy.mm.dd")} ˙{" "}
              {data?.article?.views}명 조회
            </TxtSpan>
          </V.Column>

          <Divider size={10} color="#f8f8f8" spacing={{ vertical: 20 }} />

          <V.Column padding={{ horizontal: 20 }}>
            <V.Column gap={15}>
              <TxtSpan color={colors.grey500} size={12}>
                공지 내용
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
