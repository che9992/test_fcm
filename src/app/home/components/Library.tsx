import { useRouter } from "next/router";

//libs
import { Spacing, Txt, TxtSpan, V } from "@/_ui";
import { colors } from "@/libs/themes";

//utils
import { useMoment } from "@/libs/hooks";
import { ROUTE_PATH } from "@/libs/utils/route_path";

//components
import { HomeBox } from "@/pages";
import NoneResultBox from "../../../libs/components/_custom/NoneResultBox";

//
export default function Library({ data }: { data: any }) {
  const router = useRouter();

  return (
    <HomeBox
      title="학습 자료실"
      titleRoute={() => router.push(ROUTE_PATH.서비스.자료실)}
    >
      {data?.length === 0 ? (
        <NoneResultBox
          description="자료가 존재하지 않습니다"
          backgroundColor="#f8f8f8"
        />
      ) : (
        <V.Column css={{ rowGap: "14px" }}>
          {data?.map((item: any) => (
            <V.Column
              css={{ opacity: item?.is_read ? "0.5" : "1" }}
              key={item?.id}
            >
              <Txt
                size={15}
                color={colors.grey900}
                onClick={() =>
                  router.push(`${ROUTE_PATH.서비스.자료실}/${item?.id}`)
                }
                css={{ cursor: "pointer" }}
              >
                {item?.subject} &#124; {item?.title}
              </Txt>

              <Spacing size={5} />

              <TxtSpan color={colors.grey500}>
                {useMoment(item.created_at).format("yyyy.mm.dd")} &#124;{" "}
                {item?.created_by} &#124; &nbsp;
                {item?.views}명 조회
              </TxtSpan>
            </V.Column>
          ))}
        </V.Column>
      )}
    </HomeBox>
  );
}
