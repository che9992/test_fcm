import { NextRouter, useRouter } from "next/router";

//libs
import { Txt, V } from "@/_ui";

//utils
import { useMoment } from "@/libs/hooks";
import { ROUTE_PATH } from "@/libs/utils/route_path";

//components
import { HomeBox } from "@/pages";
import NoneResultBox from "../../../libs/components/_custom/NoneResultBox";

//
export default function Notice({ data }: { data: any }) {
  const router: NextRouter = useRouter();

  return (
    <HomeBox
      title="공지사항"
      titleRoute={() => router.push(ROUTE_PATH.서비스.공지사항)}
    >
      {data?.length === 0 ? (
        <NoneResultBox
          description="공지가 존재하지 않습니다"
          backgroundColor="#f8f8f8"
        />
      ) : (
        <V.Column gap={12}>
          {data?.map((item: any, i: number) => {
            return (
              <V.Column
                css={{ opacity: item?.is_read && "0.4", cursor: "pointer" }}
                key={i}
                cursor="pointer"
                onClick={() =>
                  router.push(`${ROUTE_PATH.서비스.공지사항}/${item?.id}`)
                }
              >
                <Txt>{item.title}</Txt>
                <Txt size={13} color="#999">
                  {useMoment(item.created_at).format("yyyy.mm.dd")} &#124;{" "}
                  {item?.created_by} &#124; &nbsp;
                  {item?.views}명 조회
                </Txt>
              </V.Column>
            );
          })}
        </V.Column>
      )}
    </HomeBox>
  );
}
