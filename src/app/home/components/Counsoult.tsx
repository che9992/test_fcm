import { useRouter } from "next/router";

//libs
import { Spacing, Txt, TxtSpan, V } from "@/_ui";

//utils
import { useMoment } from "@/libs/hooks";
import { ROUTE_PATH } from "@/libs/utils/route_path";

//components
import { HomeBox } from "@/pages";
import NoneResultBox from "../../../libs/components/_custom/NoneResultBox";

//
export default function Counsoult({ data }: { data: any }) {
  const router = useRouter();

  return (
    <HomeBox
      title="나의 상담"
      titleRoute={() => router.push(ROUTE_PATH.서비스.학습관리.서비스)}
    >
      {data?.length === 0 ? (
        <NoneResultBox
          description="상담이 존재하지 않습니다"
          backgroundColor="#f8f8f8"
        />
      ) : (
        <V.Column css={{ rowGap: "14px" }}>
          {data?.map((item: any) => (
            <V.Column
              css={{ opacity: item?.is_read ? "0.5" : "1" }}
              key={item?.id}
              cursor="pointer"
              onClick={() => {
                router.push(
                  ROUTE_PATH.서비스.학습관리.상담 + "/" + item?.consultation_id
                );
              }}
            >
              <Txt size={15}>
                {item.type} | {item?.title}{" "}
              </Txt>

              <Spacing size={5} />

              <TxtSpan>
                {useMoment(item.date).format("yyyy.mm.dd")} &#124;{" "}
                {item?.created_by}
              </TxtSpan>
            </V.Column>
          ))}
        </V.Column>
      )}
    </HomeBox>
  );
}
