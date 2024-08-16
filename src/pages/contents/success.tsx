import { fontSize, MQ } from "@/libs/themes";

import { TOSS_SECRET_KEY } from "@/config/env_key";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import axios from "axios";
import { Button, Txt, V } from "@/_ui";

// ------ Payment 객체 ------
// @docs https://docs.tosspayments.com/reference#payment-객체
interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: "카드" | "가상계좌" | "계좌이체";
  paymentKey: string;
  orderId: string;
  cancels: any;
  card: any;
  suppliedAmount: any;
  taxFreeAmount: any;
  vat: any;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = (await getSession({ req: context.req })) || {};

  const {
    query: { paymentKey, orderId, amount, contentId, userId },
  } = context;

  const base_incode =
    TOSS_SECRET_KEY + ":dGVzdF9nc2tfZG9jc19PYVB6OEw1S2RtUVhrelJ6M3k0N0JNdzY6";

  try {
    // ------  결제 승인 ------
    const res = await axios.post<Payment>(
      "https://api.tosspayments.com/v1/payments/confirm",
      { paymentKey, orderId, amount },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(base_incode).toString("base64")}`,
        },
      }
    );

    console.log("세션정보", session);
    console.log("토스 결제완료", res.data);
    const payment = res.data;

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    if (res.status === 200) {
      const { data: edu_payment } = await axios.post(
        `${BASE_URL}/contents/purchases/create/`,
        {
          user_id: userId,
          content: contentId,
          paymentKey: payment.paymentKey,
          orderName: payment.orderName,
          approvedAt: payment.approvedAt,
          cancels: payment.cancels,
          card: payment.card,
          totalAmount: payment.totalAmount,
          suppliedAmount: payment.suppliedAmount,
          taxFreeAmount: payment.taxFreeAmount,
          vat: payment.vat,
          method: payment.method,
          orderId: payment.orderId,
        }
      );

      console.log("에듀셀파 결제완료", edu_payment);
    }

    return {
      props: { payment },
    };
  } catch (err: any) {
    console.error("err", err?.response?.data);

    return {
      redirect: {
        destination: `/contents/fail?code=${
          err.response.data.code
        }&message=${encodeURIComponent(
          err.response.data.message
        )}&contentId=${contentId}userId=${userId}`,
        permanent: false,
      },
    };
  }
};

type Props = { payment: Payment };

export default function SuccessPage({ payment }: Props) {
  const router = useRouter();

  return (
    <V.Section crossAlign="center" align="center">
      <V.Column align="center" maxWidth={500} padding={{ all: 26 }}>
        <img
          width="35px"
          src="https://static.toss.im/3d-emojis/u1F389_apng.png"
        />
        <Txt
          as="h4"
          css={{ [MQ[3]]: { fontSize: fontSize.s26 } }}
          margin={{ top: 6, bottom: 14 }}
        >
          결제 성공
        </Txt>

        <Txt color="#797979" txtAlign="center">
          주문 내역을 통해 결제 정보를 확인할 수 있습니다"
        </Txt>

        <Button
          width="100%"
          margin={{ top: 20 }}
          onClick={() => router.push("/contents/receipts")}
        >
          결제 목록으로
        </Button>

        {/* <div className="box_section">
          <p>paymentKey = {payment.paymentKey}</p>
          <p>orderId = {payment.orderId}</p>
          <p>amount = {payment.totalAmount.toLocaleString()}원</p>
        </div> */}
      </V.Column>
    </V.Section>
  );
}
