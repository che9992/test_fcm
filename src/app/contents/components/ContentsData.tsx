import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMoment, useTanstackQuery, useFileDownload } from "@/libs/hooks";
import { useCore } from "@/libs/provider/useCore";

//apis
import { buyContents } from "@/app/contents/apis/buyContents";
import { shareContents } from "@/app/contents/apis/shareContents";

//libs
import {
  Button,
  Input,
  TouchableOpacity,
  Txt,
  TxtSpan,
  TxtTab,
  V,
} from "@/_ui";
import { colors, MQ } from "@/libs/themes";
import TossDashboard from "./TossDashboard";
import { FileItems } from "@/libs/components/_custom/FileItems";
import { ROUTE_PATH } from "@/libs/utils/route_path";
import { CancelIcon, CheckIcon, ShareIcon } from "@/libs/assets/icons";

//utils
import { useRecoilValue, useSetRecoilState } from "recoil";
import { alartAtom } from "@/app/_layout/atoms/widgets-atom";
import { userProfileAtom } from "@/app/_layout/atoms/verify-atom";

//
export default function ContentsData({ data }: { data: any }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const shareBoxRef = useRef<HTMLDivElement | null>(null);
  const [shareActive, setShareActive] = useState(false);
  const [shareActiveTimer, setShareActiveTimer] = useState(10);
  const [sharePhoneNumber, setSharePhoneNumber] = useState("");
  const [shareSuccess, setShareSuccess] = useState({
    status: "failed",
    phone_number: "",
  });

  const { axiosInstance, router } = useCore();
  const { useMutation } = useTanstackQuery();
  const setAlart = useSetRecoilState(alartAtom);
  const profileData: any = useRecoilValue(userProfileAtom);

  const handleCloseModal = useCallback(
    () => setIsOpenModal(false),
    [isOpenModal]
  );

  // 0원 결제
  const { mutate: onBuyContent } = useMutation(
    () =>
      buyContents({
        axiosInstance,
        content: router.query.id,
        orderName: data?.title,
        totalAmount: data?.price,
      }),
    {
      onSuccess: (data) => {
        router.push(ROUTE_PATH.콘텐츠.구매목록), setAlart(true);
      },
    }
  );

  // 결제 버튼
  const buyTab = () => {
    if (!data?.on_sale)
      return (
        <Button width="100%" type="button" disabled={!data?.on_sale}>
          마감된 콘텐츠
        </Button>
      );

    if (data?.is_buyer)
      return (
        <Button
          type="button"
          width="100%"
          buttonColor={colors.red}
          txtColor="#fff"
          onClick={() => router.push(ROUTE_PATH.콘텐츠.구매목록)}
        >
          결제 취소하러 가기
        </Button>
      );

    return (
      <V.Row gap={8}>
        <Button
          width="100%"
          type="button"
          onClick={() => {
            if (Number(data?.price) !== 0) setIsOpenModal(true);
            else onBuyContent();
          }}
        >
          구매하기
        </Button>

        {Number(data?.price) !== 0 && (
          <TouchableOpacity
            minWidth={56}
            minHeight={56}
            align="center"
            crossAlign="center"
            backgroundColor="#f5f5f5"
            borderRadius={12}
            onClick={() => setShareActive(!shareActive)}
          >
            {shareActive ? (
              <CancelIcon width={24} fill="#ccc" />
            ) : (
              <ShareIcon width={24} fill="#999" />
            )}
          </TouchableOpacity>
        )}
      </V.Row>
    );
  };

  //
  // 공유하기 > 모달 >  박스 위치이동 / 상태 초기화
  useEffect(() => {
    if (shareActive) {
      if (shareBoxRef.current) {
        const topPos =
          shareBoxRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          80;
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }
    }
    if (!shareActive) setSharePhoneNumber("");
  }, [shareActive]);

  //
  // 공유하기
  const { mutate: onShareContent } = useMutation(
    () =>
      shareContents({
        axiosInstance,
        phone_number: sharePhoneNumber.replace(/-/g, ""),
        content_id: router.query.id,
        url:
          process.env.NEXT_PUBLIC_SITE_URL +
          `/contents/share/${router.query.id}?userId=${profileData?.id}`,
      }),
    {
      onSuccess: (data) => {
        setAlart(true);
        setSharePhoneNumber("");
        setShareSuccess({
          status: "success",
          phone_number: data?.phone_number,
        });
      },
    }
  );

  //
  // 공유하기 > 성공 > 박스 위치이동 / 상태 초기화
  useEffect(() => {
    if (shareSuccess.status === "success") {
      if (shareBoxRef.current) {
        const topPos =
          shareBoxRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          80;
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }
    }
    return;
  }, [shareSuccess.status]);

  //
  // 공유하기 > 성공 > 3초뒤 박시 닫기
  useEffect(() => {
    if (shareSuccess.status === "success") {
      const interval = setInterval(() => {
        setShareActiveTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);

            setShareActive(false);
            setShareSuccess((prevState) => ({
              ...prevState,
              status: "failed",
              phone_number: "",
            }));
            window.scrollTo({ top: 0, behavior: "smooth" });
            return 10;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [shareSuccess.status]);

  return (
    <>
      <V.Column
        align="start"
        gap={24}
        padding={{ all: 30 }}
        shadow={{ x: 0, y: 2, blur: 20, color: "#e9e9e9" }}
        borderRadius={16}
        css={{
          [MQ[2]]: {
            boxShadow: "none",
            padding: "26px 20px 0",
            borderRadius: 0,
          },
        }}
      >
        <V.Column gap={8}>
          <Txt as="strong" size={20}>
            {data?.title}
          </Txt>

          <Txt weight="bold" color={colors.keyColor}>
            {data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </Txt>

          <Txt margin={{ top: 10 }} size={14} color={colors.grey700}>
            {data?.content}
          </Txt>
        </V.Column>

        {/* 정보 */}
        <V.Column
          backgroundColor="#f8f9fc"
          padding={{ all: 16 }}
          borderRadius={12}
          gap={12}
        >
          <V.Row crossAlign="space-between" align="center">
            <TxtSpan>예상 배송일</TxtSpan>
            <TxtSpan color={colors.grey800}>
              {useMoment(data?.delivery_date).format("yyyy.mm.dd")}
            </TxtSpan>
          </V.Row>

          <V.Row crossAlign="space-between" align="center">
            <TxtSpan size={14}>마감일</TxtSpan>
            <TxtSpan color={colors.grey800}>
              {useMoment(data?.deadline).format("yyyy.mm.dd")}
            </TxtSpan>
          </V.Row>
        </V.Column>

        {/* 첨부파일 */}
        {data?.content_files?.length > 0 && (
          <V.Column gap={8}>
            <TxtSpan size={12} color="#aaa">
              첨부 파일
            </TxtSpan>

            <V.Column gap={6}>
              {data?.content_files?.map((item: any) => {
                return (
                  <FileItems
                    key={item?.file}
                    onClick={() =>
                      useFileDownload({
                        file: item?.file,
                        title: item?.title,
                      })
                    }
                  >
                    {item?.title}
                  </FileItems>
                );
              })}
            </V.Column>
          </V.Column>
        )}

        {/* 버튼 */}
        <V.Column gap={10} margin={{ top: 10 }}>
          {!data?.on_sale && (
            <V.Column
              align="center"
              backgroundColor={colors.redBg}
              padding={{ all: 10 }}
              borderRadius={12}
            >
              <Txt color={colors.red} size={13}>
                ⛔️ 해당 콘텐츠는 마감되었어요 😭😭
              </Txt>
            </V.Column>
          )}

          {!!data?.is_buyer && (
            <V.Column
              align="center"
              backgroundColor={colors.blueBg}
              padding={{ all: 10 }}
              borderRadius={12}
            >
              <Txt color={colors.blue} size={13}>
                ✅ 이미 구매한 콘텐츠입니다
              </Txt>
            </V.Column>
          )}

          {buyTab()}
        </V.Column>
      </V.Column>

      {/* 공유하기 화면 */}
      {shareActive && (
        <V.Column
          ref={shareBoxRef}
          align="start"
          borderRadius={16}
          padding={{ top: 30, horizontal: 30, bottom: 14 }}
          margin={{ top: 20 }}
          shadow={{ x: 0, y: 2, blur: 20, color: "#e9e9e9" }}
          css={{
            [MQ[2]]: {
              boxShadow: "none",
              marginTop: "30px",
              padding: "30px 25px 14px",
              borderRadius: 0,
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          {shareSuccess.status === "success" ? (
            <V.Column align="center">
              <CheckIcon fill="#3ECC39" width={28} />

              <Txt
                as="strong"
                weight="bold"
                size={18}
                txtAlign="center"
                padding={{ top: 14 }}
              >
                {shareSuccess.phone_number} 으로 결제 요청
                <br />
                알림톡이 전송되었습니다
              </Txt>

              <Txt padding={{ top: 10, bottom: 20 }} color="#797979">
                보호자가 결제 시 구매 목록이 업데이트됩니다
              </Txt>

              <Txt size={13} color={colors.blue} padding={{ bottom: 10 }}>
                ⌛ 해당 화면은 {shareActiveTimer}초 뒤에 자동으로 사라집니다
              </Txt>
            </V.Column>
          ) : (
            <>
              <Txt as="strong" weight="bold" size={20}>
                결제 요청 알림톡 전송
              </Txt>

              <Txt padding={{ top: 10, bottom: 24 }}>
                {
                  "보호자에게 콘텐츠 구매를 요청할 수 있습니다\n결제 완료 시 나의 구매목록에서 확인 가능합니다"
                }
              </Txt>

              <Input label="연락처">
                <Input.PhoneNumberField
                  placeholder="연락처를 입력하세요"
                  value={sharePhoneNumber}
                  onChange={(e) => setSharePhoneNumber(e.target.value)}
                />
              </Input>

              <Button
                width="100%"
                type="button"
                margin={{ top: 20 }}
                disabled={!sharePhoneNumber || sharePhoneNumber.length < 9}
                onClick={() => onShareContent()}
              >
                전송하기
              </Button>

              <V.Column align="center" margin={{ top: 4 }}>
                <TxtTab
                  padding={{ all: 16 }}
                  color="#aaa"
                  onClick={() => setShareActive(false)}
                >
                  닫기
                </TxtTab>
              </V.Column>
            </>
          )}
        </V.Column>
      )}

      <TossDashboard
        view={isOpenModal}
        onCancel={handleCloseModal}
        price={data?.price}
        contentName={data?.title}
      />
    </>
  );
}
