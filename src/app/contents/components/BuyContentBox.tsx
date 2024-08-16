import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useMoment } from "@/libs/hooks";

//libs
import { colors } from "@/libs/themes";
import { Txt, TxtSpan, TxtTab, V } from "@/_ui";

import CancelModal from "./CancelModal";

//
export default function BuyContentBox({ item }: { item: any }) {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const router = useRouter();

  // 현재 상황
  const statusTab = (item: any) => {
    if (!item?.content_on_sale)
      return <TxtSpan size={12}>⛔️ 마감된 콘텐츠</TxtSpan>;
    if (item?.status === "취소요청")
      return (
        <TxtSpan size={12} color={colors.red}>
          취소 진행 중
        </TxtSpan>
      );
    if (item?.status === "구매완료")
      return (
        <TxtTab
          size={13}
          color={colors.red}
          onClick={() => setCancelModalOpen(true)}
        >
          결제취소
        </TxtTab>
      );
  };

  // 취소 모달
  const onCloseCancelModal = useCallback(
    () => setCancelModalOpen(false),
    [cancelModalOpen]
  );

  return (
    <>
      <V.Column
        gap={4}
        key={item?.id}
        border={{ solid: 1, color: "#eee" }}
        padding={{ all: 16 }}
        borderRadius={16}
        backgroundColor={!item?.content_on_sale ? colors.grey100 : colors.white}
      >
        <V.Row crossAlign="space-between" align="center">
          <Txt
            weight="medium"
            color={!item?.content_on_sale ? colors.grey500 : colors.grey900}
            css={{ cursor: "pointer" }}
            onClick={() => router.push(`/contents/${item?.content_id}`)}
          >
            {item?.content_title}
          </Txt>
          <TxtSpan size={12}>
            {useMoment(item?.created_at).format("yyyy.mm.dd")}
          </TxtSpan>
        </V.Row>

        <Txt size={14} color={colors.keyColor}>
          {item?.content_price
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </Txt>

        <V.Row crossAlign="space-between" align="end">
          <V.Column>
            <TxtSpan size={12} color="#999">
              상태 : {item?.status}{" "}
              {item?.method && ` | 결제정보 : ${item?.method}`}
            </TxtSpan>

            <TxtSpan size={12} color="#aaa">
              {item?.orderId && `영수증 번호 :  ${item?.orderId}`}
            </TxtSpan>
          </V.Column>

          {statusTab(item)}
        </V.Row>

        {!!item?.cancels && (
          <V.Column
            padding={{ all: 10 }}
            margin={{ top: 10 }}
            borderRadius={10}
            gap={3}
            backgroundColor="#f0f0f0"
          >
            <Txt size={12} color="#888">
              취소자 {item?.canceled_by_teacher ? "[선생님]" : "[학생]"} :{" "}
              {item?.canceled_by} {!!item?.canceled_by_teacher && "(선생님)"}
            </Txt>

            <Txt size={12} color="#888">
              취소일 : {useMoment(item?.canceled_at).format("yyyy.mm.dd")}
            </Txt>

            <Txt size={12} color="#888">
              취소사유 : {item?.cancels?.cancelReason}
            </Txt>
          </V.Column>
        )}
      </V.Column>

      <CancelModal
        view={cancelModalOpen}
        onCancel={onCloseCancelModal}
        item={item}
      />
    </>
  );
}
