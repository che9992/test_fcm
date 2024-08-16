import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";

//libs
import { DashboardModal } from "@/libs/components/_custom/DashboardModal";

//atoms
import { userProfileAtom } from "@/app/_layout/atoms/verify-atom";
import { useRecoilValue } from "recoil";

//hooks
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { TOSS_CLIENT_KEY } from "@/config/env_key";
import { useAsync } from "react-use";
import { nanoid } from "nanoid";
import { Button, Spacing, Txt, V } from "@/_ui";

interface Props {
  price: number;
  contentName: string;
  view: boolean;
  onCancel: () => void;
}

const clientKey = TOSS_CLIENT_KEY;
const customerKey = nanoid();

export default function TossDashboard({
  price,
  contentName,
  view,
  onCancel,
}: Props) {
  const router = useRouter();
  const profileData: any = useRecoilValue(userProfileAtom);
  const { username, email, phoneNumber = "01087737561" } = profileData ?? {};

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  useAsync(async () => {
    // ------  결제위젯 초기화 ------
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제

    // ------  결제 UI 렌더링 ------
    // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    // ------  이용약관 UI 렌더링 ------
    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [view]);

  //
  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) return;

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  // 결제하기 : 버튼 핸들러
  const onActivePayTab = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: contentName,
        taxFreeAmount: price,
        customerName: username,
        customerEmail: email,
        customerMobilePhone: phoneNumber,
        successUrl: `${window.location.origin}/contents/success/?contentId=${router.query.id}&userId=${profileData?.id}`,
        failUrl: `${window.location.origin}/contents/fail`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardModal view={view} onCancel={onCancel}>
      <V.Column padding={{ top: 0, bottom: 20 }}>
        <V.Column gap={4} padding={{ horizontal: 30 }}>
          <Txt as="strong">{contentName}</Txt>
          <Txt color="#797979">
            {price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </Txt>
        </V.Column>

        <div id="payment-widget" style={{ width: "100%" }} />
        <div
          id="agreement"
          style={{
            width: "100%",
            maxHeight: 65,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />

        <V.Column padding={{ horizontal: 30 }} gap={10}>
          <V.Column
            padding={{ all: 18 }}
            backgroundColor="#f8f8f8"
            borderRadius={14}
          >
            <Txt weight="bold">구매자 정보</Txt>

            <Spacing size={6} />

            <Txt size={14} color="#666">
              {username}
            </Txt>

            <Txt size={13} color="#666">
              {email} ˙ {phoneNumber}
            </Txt>
          </V.Column>

          <Button width="100%" type="button" onClick={() => onActivePayTab()}>
            결제하기
          </Button>
        </V.Column>
      </V.Column>
    </DashboardModal>
  );
}
