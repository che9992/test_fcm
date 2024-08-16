import { V, Spacing, Txt, TxtSpan } from "@/_ui";
import { useMoment } from "@/libs/hooks";

export default function TitleBox({ data }: { data: any }) {
  return (
    <V.Column padding={{ horizontal: 20 }}>
      <Txt size={18} as="h6">
        {data.title}
      </Txt>

      <Spacing size={8} />

      <TxtSpan size={13}>
        {data?.created_by} ˙ {useMoment(data?.created_at).format("yyyy.mm.dd")}{" "}
        ˙ {data?.views}명 조회
      </TxtSpan>
    </V.Column>
  );
}
