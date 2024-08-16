import { ReactNode } from "react";
import { colors } from "@/libs/themes/colors";
import View from "@/app/_layout/components/View";
import { V, Spacing, Txt } from "@/_ui";

export default function ReservateWrapper({
  children,
  title,
  data,
  loading,
}: {
  children: ReactNode;
  title: string;
  data: any;
  loading: boolean;
}) {
  return (
    <View category="예약관리" loading={loading}>
      <V.Column align="center">
        <V.Column
          maxWidth={732}
          padding={{ top: 30, bottom: 40, horizontal: 16 }}
        >
          <V.Column gap={10}>
            <Txt as="strong" weight="bold">
              {title} 예약 검색
            </Txt>
            <Txt color="#797979" size={14}>
              {data?.rule?.manual}
            </Txt>

            {!!data?.error_msg && (
              <Txt color={colors.red} size={13}>
                😭 {data?.error_msg}
              </Txt>
            )}
          </V.Column>

          <Spacing size={16} />

          {children}
        </V.Column>
      </V.Column>
    </View>
  );
}
