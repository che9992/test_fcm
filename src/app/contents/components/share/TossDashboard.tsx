import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";

//libs
import { DashboardModal } from "@/libs/components/_custom/DashboardModal";
import { Button, Txt, V } from "@/_ui";

//hooks
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { TOSS_CLIENT_KEY } from "@/config/env_key";
import { useAsync } from "react-use";
import { nanoid } from "nanoid";

interface Props {
  price: number;
  contentName: string;
  studentInfo: any;
  view: boolean;
  onCancel: () => void;
}

const clientKey = TOSS_CLIENT_KEY;
const customerKey = nanoid();

export default function TossDashboard({
  price,
  contentName,
  studentInfo,
  view,
  onCancel,
}: Props) {
  const router = useRouter();
  const { name, email, student_mobile } = studentInfo ?? {};

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
      "#payment-widget2",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    // ------  이용약관 UI 렌더링 ------
    paymentWidget.renderAgreement("#agreement2", { variantKey: "AGREEMENT" });
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
    const contentId = router.query.id;
    const userId = router.query.userId;

    if (!paymentWidget || !contentId || !userId) {
      console.error("필수 값이 누락되었습니다.");
      return;
    }

    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: contentName,
        taxFreeAmount: price,
        customerName: name,
        customerEmail: email,
        customerMobilePhone: student_mobile,
        successUrl: `${window.location.origin}/contents/share/success/?contentId=${contentId}&userId=${userId}`,
        failUrl: `${window.location.origin}/contents/share/fail`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardModal view={view} onCancel={onCancel}>
      <V.Column padding={{ bottom: 20 }}>
        <V.Column gap={4} padding={{ horizontal: 30 }}>
          <Txt as="strong">{contentName}</Txt>
          <Txt color="#797979">
            {price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </Txt>
        </V.Column>

        <div id="payment-widget2" style={{ width: "100%" }} />
        <div id="agreement2" style={{ width: "100%" }} />

        <V.Column padding={{ horizontal: 30 }}>
          <Button width="100%" type="button" onClick={onActivePayTab}>
            결제하기
          </Button>
        </V.Column>
      </V.Column>
    </DashboardModal>
  );
}
