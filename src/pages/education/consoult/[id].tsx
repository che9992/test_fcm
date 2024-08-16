import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery, useMoment } from "@/libs/hooks";
import { ReactNode } from "react";

//components
import { Spacing, Txt, TxtSpan, V } from "@/_ui";
import { colors } from "@/libs/themes";

//apis
import { getConsoultDetail } from "@/app/education/consoult/apis/getConsoultDetail";

//libs
import View from "@/app/_layout/components/View";

//
export default function ConsoultDetail() {
  const { axiosInstance, router } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();

  const { data, isLoading } = useQuery(
    [queryKey.학습관리.상담상세, router.query.id],
    () => getConsoultDetail({ axiosInstance, id: router.query.id }),
    {
      enabled: !!router.query.id,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return (
    <View
      appTitle="상담상세"
      backEvent={() => router.back()}
      loading={isLoading}
      navigator={false}
    >
      <V.Column
        align="center"
        gap={16}
        maxWidth={600}
        padding={{ top: 20, bottom: 40, horizontal: 15 }}
      >
        <BoxShadow>
          <Txt weight="medium" size={18}>
            {data?.title}{" "}
          </Txt>
          <Spacing size={10} />

          <Txt size={13} color="#999">
            과목 : {data?.classification} &nbsp;|&nbsp; 분류 : {data?.type}{" "}
            &nbsp;|&nbsp; 날짜 : {useMoment(data?.date).format("yyyy.mm.dd")}
          </Txt>
          <Spacing size={2} />

          <TxtSpan>작성자 : {data?.created_by}</TxtSpan>
        </BoxShadow>

        <BoxShadow>
          <Txt weight="medium" size={14} color={colors.grey700}>
            상담 내용
          </Txt>

          <Spacing size={16} />

          <Txt>{data?.content}</Txt>
        </BoxShadow>
      </V.Column>
    </View>
  );
}

ConsoultDetail.auth = true;

const BoxShadow = ({ children }: { children: ReactNode }) => (
  <V.Column
    shadow={{ x: 0, y: 2, blur: 20, color: "#eee" }}
    padding={{ all: 20 }}
    borderRadius={20}
  >
    {children}
  </V.Column>
);
