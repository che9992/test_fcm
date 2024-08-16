import React, { useCallback, useState } from "react";

//libs
import { MQ, colors } from "@/libs/themes";

//utils
import { useFileDownload } from "@/libs/hooks/useFileDownload";
import TossDashboard from "./TossDashboard";
import { useMoment } from "@/libs/hooks";
import { Button, Txt, TxtSpan, V } from "@/_ui";
import { FileItems } from "@/libs/components/_custom/FileItems";

//
export default function ContentsData({ data }: { data: any }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = useCallback(
    () => setIsOpenModal(false),
    [isOpenModal]
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
        <Button width="100%" type="button" disabled={data?.is_buyer}>
          이미 구매한 콘텐츠
        </Button>
      );

    return (
      <Button
        width="100%"
        type="button"
        onClick={() => {
          if (Number(data?.price) !== 0) setIsOpenModal(true);
        }}
      >
        구매하기
      </Button>
    );
  };

  return (
    <>
      <V.Column
        shadow={{ x: 0, y: 2, blur: 20, color: "#e9e9e9" }}
        borderRadius={16}
        align="start"
        gap={24}
        padding={{ all: 30 }}
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

          <V.Column
            padding={{ all: 20 }}
            backgroundColor="#f8f8f8"
            borderRadius={12}
            margin={{ top: 10 }}
          >
            <p css={{ fontSize: 15, color: "#555", whiteSpace: "pre-line" }}>
              <span css={{ fontWeight: 600, fontSize: 16, color: "#333" }}>
                🙏 {data?.student_info.name}{" "}
              </span>
              학생이 요청한 결제 내용입니다
            </p>

            <Txt color="#555" size={14} padding={{ top: 10 }}>
              학생 생년월일 :{" "}
              {useMoment(data?.student_info.birthday).format("yyyy.mm.dd")}
            </Txt>

            <Txt color="#797979" size={14} padding={{ top: 14, bottom: 4 }}>
              결제 이후 학생에게 알림이 전송됩니다
            </Txt>

            <Txt color="#797979" size={14}>
              결제 취소는 학생이 직접 취소할 수 있습니다
            </Txt>
          </V.Column>
        </V.Column>
      </V.Column>

      <TossDashboard
        view={isOpenModal}
        onCancel={handleCloseModal}
        price={data?.price}
        contentName={data?.title}
        studentInfo={data?.student_info}
      />
    </>
  );
}
