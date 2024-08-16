import React from "react";
import { Txt, TxtSpan, V } from "@/_ui";
import { colors } from "@/libs/themes";

export default function StatusBar({
  status,
  memo,
}: {
  status: "종료" | "진행중";
  memo: string | undefined;
}) {
  return (
    <V.Column padding={{ horizontal: 20, bottom: 30 }}>
      <V.Row align="center" crossAlign="space-between" minHeight={60}>
        <Txt size={16} weight="bold">
          채팅방 상태
        </Txt>

        <V.Row align="center" gap={6} width="auto">
          <V.Container
            width="auto"
            minWidth={6}
            minHeight={6}
            borderRadius={100}
            backgroundColor={status === "진행중" ? colors.keyColor : colors.red}
          />

          <Txt size={14} color="#555">
            {status}
          </Txt>
        </V.Row>
      </V.Row>

      <V.Column
        padding={{ all: 16 }}
        backgroundColor="#f8f8f8"
        borderRadius={14}
        gap={8}
      >
        <TxtSpan size={12} color="#797979">
          ✏️ 공지사항
        </TxtSpan>

        <Txt size={14} color={memo ? "#555" : "#999"}>
          {memo ? memo : "공지사항이 존재하지 않습니다"}
        </Txt>
      </V.Column>
    </V.Column>
  );
}
