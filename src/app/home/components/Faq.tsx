import { useRouter } from "next/router";

//libs
import { Spacing, Txt, TxtSpan, V } from "@/_ui";

//utils
import { useMoment } from "@/libs/hooks";
import { ROUTE_PATH } from "@/libs/utils/route_path";

//components
import { HomeBox } from "@/pages";
import NoneResultBox from "../../../libs/components/_custom/NoneResultBox";
import { colors } from "@/libs/themes";
//
export default function Faq({ data }: { data: any }) {
  const router = useRouter();

  return (
    <HomeBox
      title="나의 문의"
      titleRoute={() => router.push(ROUTE_PATH.문의하기)}
    >
      {data?.length === 0 ? (
        <NoneResultBox
          description="문의가 존재하지 않습니다"
          backgroundColor="#f8f8f8"
        />
      ) : (
        <V.Column css={{ rowGap: "14px" }}>
          {data?.map((item: any) => (
            <V.Column
              css={{ opacity: item?.is_read ? "0.5" : "1" }}
              key={item?.id}
              onClick={() => {
                if (item?.learning_question) {
                  router.push(`/faq/${item?.inquiry_id}`);
                } else {
                  router.push(`/faq/${item?.inquiry_id}`);
                }
              }}
            >
              <Txt size={15} ellipsis={{ line: 1, ellipsis: true }}>
                {item.category} | {item?.title}{" "}
              </Txt>

              <Spacing size={5} />

              <V.Row gap={6}>
                <TxtSpan
                  color={item?.is_answered ? colors.blue : colors.grey300}
                >
                  {item?.is_answered ? "[답변완료]" : "[답변대기]"}
                </TxtSpan>

                <TxtSpan color={colors.grey500}>
                  {useMoment(item.created_at).format("yyyy.mm.dd")}{" "}
                  {item?.learning_question &&
                    `${item?.teacher_name ? `| ${item?.teacher_name}` : ""}`}
                </TxtSpan>
              </V.Row>
            </V.Column>
          ))}
        </V.Column>
      )}
    </HomeBox>
  );
}
