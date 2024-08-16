import { Image, Txt, TxtSpan, V } from "@/_ui";

import { useFileDownload } from "@/libs/hooks/useFileDownload";
import { colors } from "@/libs/themes/colors";
import { FileItems } from "../../../libs/components/_custom/FileItems";

export default function ContentBox({
  data,
  images,
}: {
  data: any;
  images?: any;
}) {
  return (
    <>
      <V.Column padding={{ horizontal: 20 }} gap={30}>
        <V.Column gap={15}>
          <TxtSpan color={colors.grey500} size={12}>
            식단 내용
          </TxtSpan>
          <Txt>{data?.article?.content}</Txt>
        </V.Column>

        {images?.length !== 0 && (
          <V.Column gap={20}>
            {images?.map((item: any) => (
              <Image source={item?.file} alt={item?.title} zoomUp />
            ))}
          </V.Column>
        )}

        {data?.article_files?.length > 0 && (
          <V.Column gap={8}>
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
    </>
  );
}
