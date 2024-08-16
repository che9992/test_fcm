import React, { useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//libs
import { useJenga } from "@/_ui";
import {
  BottomSheet,
  Button,
  Checkbox,
  Input,
  Select,
  Spacing,
  Txt,
  V,
} from "@/_ui";

//apis
import { cancelPayContents } from "@/app/contents/apis/cancelPayContents";

//atoms
import { useSetRecoilState } from "recoil";
import { alartAtom } from "@/app/_layout/atoms/widgets-atom";

interface Props {
  item: any;
  view: boolean;
  onCancel: () => void;
}

export default function CancelModal({ view, onCancel, item }: Props) {
  const { addToast } = useJenga();
  const setIsAlart = useSetRecoilState(alartAtom);
  const { axiosInstance, router } = useCore();
  const { useMutation, queryKey, queryClient } = useTanstackQuery();
  const [isReason, setIsReason] = useState("");
  const [anotherReasonCheck, setAnotherReasonCheck] = useState(false);
  const [refundReceiveAccount, setRefundReceiveAccount] = useState({
    bank: "",
    accountNumber: "",
    holderName: "",
  });

  const { mutate: onCancelPay } = useMutation(
    () =>
      cancelPayContents({
        axiosInstance,
        purchase_id: item?.purchase_id as any,
        cancels: { cancelReason: isReason } as any,
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([queryKey.콘텐츠.구매내역]);
        onCancel();
        setIsAlart(true);
      },
    }
  );

  return (
    <BottomSheet open={view} onCancel={onCancel}>
      <V.Container padding={{ all: 20 }}>
        <Txt as="strong" weight="bold">
          결제 취소 요청을
          <br />
          하시겠습니까?
        </Txt>

        <Spacing size={12} />

        <Txt size={14} color="#888">
          결제 취소는 선생님이 검토 후 취소해드려요
          <br />
          마감된 콘텐츠 또는 취소가 불가능한 콘텐츠는 취소가 거절될 수 있어요
        </Txt>

        <V.Column gap={6} margin={{ top: 20 }}>
          <Checkbox
            label={{ title: "콘텐츠를 잘 못 구매했어요" }}
            type="radio"
            id="cancel_pay1"
            name="cancel_pay"
            value="콘텐츠를 잘 못 구매했어요"
            onChange={(e) => {
              setAnotherReasonCheck(false);
              setIsReason(e.target.value);
            }}
          />

          <Checkbox
            label={{ title: "취소 후 재구매할 예정이에요" }}
            type="radio"
            id="cancel_pay2"
            name="cancel_pay"
            value="취소 후 재구매할 예정이에요"
            onChange={(e) => {
              setAnotherReasonCheck(false);
              setIsReason(e.target.value);
            }}
          />

          <Checkbox
            label={{ title: "중복 구매했어요" }}
            type="radio"
            id="cancel_pay3"
            name="cancel_pay"
            value="중복 구매했어요"
            onChange={(e) => {
              setAnotherReasonCheck(false);
              setIsReason(e.target.value);
            }}
          />

          <Checkbox
            label={{ title: "기타" }}
            type="radio"
            id="cancel_pay4"
            name="cancel_pay"
            value=""
            onChange={(e) => {
              setAnotherReasonCheck(true);
              setIsReason("");
            }}
          />

          {anotherReasonCheck && (
            <>
              <Spacing size={1} />
              <Input.Textarea
                placeholder="기타 취소 사유를 입력하세요"
                rows={3}
                value={isReason}
                onChange={(e) => setIsReason(e.target.value)}
              />
            </>
          )}
        </V.Column>

        {item?.method === "가상계좌" && (
          <V.Column
            gap={8}
            margin={{ top: 16 }}
            padding={{ all: 14 }}
            borderRadius={16}
            backgroundColor="#f8f8f8"
          >
            <Txt weight="medium" margin={{ bottom: 4 }}>
              가상계좌 환불 내용을 입력하세요
            </Txt>

            <Select
              value={refundReceiveAccount.bank}
              onChange={(e) =>
                setRefundReceiveAccount({
                  ...refundReceiveAccount,
                  bank: e.target.value,
                })
              }
              options={banks}
              renderItem={(item) => (
                <Select.Option key={item?.code} value={item?.number_code}>
                  {item?.bank}
                </Select.Option>
              )}
            />

            <Input.TextField
              placeholder="예금주 입력 ex_홍길동"
              value={refundReceiveAccount.bank}
              onChange={(e) =>
                setRefundReceiveAccount({
                  ...refundReceiveAccount,
                  holderName: e.target.value,
                })
              }
            />
            <Input.TextField
              placeholder="계좌번호 -제외 입력 ex_110123456789"
              onChange={(e) =>
                setRefundReceiveAccount({
                  ...refundReceiveAccount,
                  accountNumber: e.target.value,
                })
              }
            />
          </V.Column>
        )}

        <Spacing size={20} />

        <Button
          type="button"
          width="100%"
          disabled={
            !isReason ||
            (item?.method === "가상계좌" &&
              !!(
                refundReceiveAccount.bank &&
                refundReceiveAccount.accountNumber &&
                refundReceiveAccount.holderName
              ))
          }
          onClick={() => onCancelPay()}
        >
          결제 취소 요청
        </Button>
      </V.Container>
    </BottomSheet>
  );
}

const banks = [
  {
    bank: "경남은행",
    code: "039",
    number_code: "39",
    ko_code: "경남",
    en_code: "KYONGNAMBANK",
  },
  {
    bank: "광주은행",
    code: "034",
    number_code: "34",
    ko_code: "광주",
    en_code: "GWANGJUBANK",
  },
  {
    bank: "단위농협(지역농축협)",
    code: "012",
    number_code: "12",
    ko_code: "단위농협",
    en_code: "LOCALNONGHYEOP",
  },
  {
    bank: "부산은행(BNK)",
    code: "032",
    number_code: "32",
    ko_code: "부산",
    en_code: "BUSANBANK",
  },
  {
    bank: "새마을금고",
    code: "045",
    number_code: "45",
    ko_code: "새마을",
    en_code: "SAEMAUL",
  },
  {
    bank: "산림조합",
    code: "064",
    number_code: "64",
    ko_code: "산림",
    en_code: "SANLIM",
  },
  {
    bank: "신한은행",
    code: "088",
    number_code: "88",
    ko_code: "신한",
    en_code: "SHINHAN",
  },
  {
    bank: "신협",
    code: "048",
    number_code: "48",
    ko_code: "신협",
    en_code: "SHINHYEOP",
  },
  {
    bank: "씨티은행",
    code: "027",
    number_code: "27",
    ko_code: "씨티",
    en_code: "CITI",
  },
  {
    bank: "우리은행",
    code: "020",
    number_code: "20",
    ko_code: "우리",
    en_code: "WOORI",
  },
  {
    bank: "우체국예금보험",
    code: "071",
    number_code: "71",
    ko_code: "우체국",
    en_code: "POST",
  },
  {
    bank: "저축은행중앙회",
    code: "050",
    number_code: "50",
    ko_code: "저축",
    en_code: "SAVINGBANK",
  },
  {
    bank: "전북은행",
    code: "037",
    number_code: "37",
    ko_code: "전북",
    en_code: "JEONBUKBANK",
  },
  {
    bank: "제주은행",
    code: "035",
    number_code: "35",
    ko_code: "제주",
    en_code: "JEJUBANK",
  },
  {
    bank: "카카오뱅크",
    code: "090",
    number_code: "90",
    ko_code: "카카오",
    en_code: "KAKAOBANK",
  },
  {
    bank: "토스뱅크",
    code: "092",
    number_code: "92",
    ko_code: "토스",
    en_code: "TOSSBANK",
  },
  {
    bank: "하나은행",
    code: "081",
    number_code: "81",
    ko_code: "하나",
    en_code: "HANA",
  },
  {
    bank: "홍콩상하이은행",
    code: "054",
    number_code: "54",
    ko_code: "-",
    en_code: "HSBC",
  },
  {
    bank: "IBK기업은행",
    code: "003",
    number_code: "03",
    ko_code: "기업",
    en_code: "IBK",
  },
  {
    bank: "KB국민은행",
    code: "004",
    number_code: "06",
    ko_code: "국민",
    en_code: "KOOKMIN",
  },
  {
    bank: "DGB대구은행",
    code: "031",
    number_code: "31",
    ko_code: "대구",
    en_code: "DAEGUBANK",
  },
  {
    bank: "KDB산업은행",
    code: "002",
    number_code: "02",
    ko_code: "산업",
    en_code: "KDBBANK",
  },
  {
    bank: "NH농협은행",
    code: "011",
    number_code: "11",
    ko_code: "농협",
    en_code: "NONGHYEOP",
  },
  {
    bank: "SC제일은행",
    code: "023",
    number_code: "23",
    ko_code: "SC제일",
    en_code: "SC",
  },
  {
    bank: "Sh수협은행",
    code: "007",
    number_code: "07",
    ko_code: "수협",
    en_code: "SUHYEOP",
  },
];
