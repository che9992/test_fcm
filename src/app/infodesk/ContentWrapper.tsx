import { Image, Spacing, TouchableOpacity, Txt } from "@/_ui";
import InfoDeskBox from "@/_widgets/InfoDeskBox";
import { V } from "react-layout-flexbox";

//
type Types = {
  category?: "웹" | "안드로이드" | "IOS";
  title: string;
  txt?: string;
  cotents?: { image?: string; title?: string; txts?: string[] }[];
};

//
export default function ContentWrapper({
  category,
  title,
  txt,
  cotents,
}: Types) {
  return (
    <V.Column>
      <Txt as="b" size={22}>
        {title}
      </Txt>

      <Spacing size={12} />

      {txt && <Txt color="#666">{txt}</Txt>}
      {(category === "IOS" || category === "안드로이드") && (
        <InfoDeskBox
          type="PWA"
          title="어플을 먼저 설치하세요"
          description={`푸시 알림 설정을 위해 ${category} 앱을 먼저 설치하세요`}
          backgroundColor="#f8f9fc"
          margin={{ top: 15 }}
        />
      )}

      <Spacing size={30} />

      <V.Column gap={20}>
        {cotents?.map((el: any) => (
          <V.Column
            padding={{ all: 20 }}
            backgroundColor="#f8f8f8"
            borderRadius={14}
          >
            {el.image && (
              <>
                <Image
                  source={el.image}
                  alt="알림"
                  objectFit="fill"
                  borderRadius={10}
                  zoomUp
                />
                <Spacing size={26} />
              </>
            )}

            <Txt as="strong">{el.title}</Txt>

            <V.Column
              padding={{ all: 10 }}
              margin={{ top: 5 }}
              backgroundColor="#f8f8f8"
              gap={8}
            >
              {el.txts.map((txt: string, i: number) => (
                <V.Row gap={10}>
                  <Txt whiteSpace="nowrap" weight="medium" color="#797979">
                    {i + 1 + "."}
                  </Txt>
                  <Txt color="#666">{txt}</Txt>
                </V.Row>
              ))}
            </V.Column>
          </V.Column>
        ))}
      </V.Column>
    </V.Column>
  );
}
