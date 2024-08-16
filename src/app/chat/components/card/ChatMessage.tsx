import React from "react";
import { useMoment } from "@/libs/hooks";
import { saveAs } from "file-saver";

//libs
import { Avatar, Image, TouchableOpacity, Txt, TxtSpan, V } from "@/_ui";
import { FileIcon } from "@/_ui/Input/send_field_icon/file-icon";
import { colors } from "@/libs/themes";

//atoms
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "@/app/_layout/atoms/verify-atom";

type Types = {
  sender?: any;
  type: "메세지" | "파일" | "채팅종료" | "채팅활성화" | "초대" | "채팅시작";
  is_view: boolean;
  message?: string;
  files?: { id: number; title: string; url: string }[] | null;
  readCount: number;
  created_at: any;
};

export default function ChatMessage({
  sender,
  type,
  is_view,
  message,
  files,
  readCount,
  created_at,
}: Types) {
  const profile = useRecoilValue(userProfileAtom);
  const isSender = sender?.id === profile?.id;

  const file: { id: number; title: string; file: string } | any = files;
  const fileExtension = file?.file?.split(".").pop()?.toLowerCase();
  const isImage =
    fileExtension === "jpg" ||
    fileExtension === "png" ||
    fileExtension === "jpeg";

  if (
    type === "초대" ||
    type === "채팅종료" ||
    type === "채팅활성화" ||
    type === "채팅시작"
  )
    return <InfoBox message={message} created_at={created_at} />;

  if (type === "파일" || type === "메세지")
    return (
      <V.Row crossAlign={isSender ? "end" : "start"} gap={6}>
        <V.Container padding={{ top: 4 }} width="auto">
          {!isSender && (
            <Avatar
              source={sender?.picture ?? "/images/logo-384.png"}
              alt={sender?.name}
              size={26}
              borderRadius={100}
            />
          )}
        </V.Container>

        <V.Column width="auto" gap={3} align={isSender ? "end" : "start"}>
          {!isSender && (
            <TxtSpan size={12} color="#888" padding={{ bottom: 2 }}>
              {sender?.name}
            </TxtSpan>
          )}

          {is_view ? (
            <>
              {type === "파일" ? (
                <>
                  {!isImage ? (
                    <TouchableOpacity
                      minWidth={120}
                      maxWidth={120}
                      minHeight={120}
                      maxHeight={120}
                      direction="vertical"
                      align="center"
                      crossAlign="center"
                      backgroundColor="#f6f6f6"
                      gap={10}
                      borderRadius={
                        isSender
                          ? "12px 2px 12px 12px"
                          : ("2px 12px 12px 12px" as any)
                      }
                      onClick={() =>
                        useFileDownload({
                          file: file?.file,
                          title: file?.title,
                        })
                      }
                    >
                      <FileIcon size={24} />

                      <Txt size={12} color="#aaa">
                        클릭 시 파일 설치
                      </Txt>
                    </TouchableOpacity>
                  ) : (
                    <Image
                      zoomUp
                      size={{
                        maxWidth: 120,
                        minWidth: 120,
                        maxHeight: 120,
                        minHeight: 120,
                      }}
                      objectFit="cover"
                      borderRadius={
                        isSender
                          ? "12px 2px 12px 12px"
                          : ("2px 12px 12px 12px" as any)
                      }
                      css={{ border: "1px solid #eee" }}
                      source={file?.file as any}
                      alt={file?.title as any}
                    />
                  )}
                </>
              ) : (
                <MessageBox message={message} isSender={isSender} />
              )}
            </>
          ) : (
            <MessageBox
              type="삭제"
              message="삭제된 메세지입니다"
              isSender={isSender}
            />
          )}

          <V.Row width="auto" gap={5} align="center">
            {readCount > 0 && (
              <TxtSpan size={11} color={colors.keyColor} weight="medium">
                {readCount}
              </TxtSpan>
            )}

            <TxtSpan size={11} color="#aaa">
              {useMoment(created_at).fromNow()}
            </TxtSpan>
          </V.Row>
        </V.Column>
      </V.Row>
    );
}

//
const InfoBox = ({
  message,
  created_at,
}: {
  message: any;
  created_at: any;
}) => (
  <V.Column backgroundColor="#fff" padding={{ all: 14 }} align="center" gap={1}>
    <Txt color="#bbb" size={13} txtAlign="center">
      {message}
    </Txt>

    <Txt color="#bbb" size={12} txtAlign="center">
      {useMoment(created_at).detailMoment()}
    </Txt>
  </V.Column>
);

//
const MessageBox = ({
  type,
  message,
  isSender,
}: {
  type?: "삭제" | null;
  message: any;
  isSender: any;
}) => {
  let backgroundColor = "#f6f6f6";
  let txtColor = "#666";

  if (type === "삭제") {
    backgroundColor = "#f0f0f0";
    txtColor = "#999";
  }

  if (isSender) {
    backgroundColor = colors.keyColor;
    txtColor = "#fff";
  }

  return (
    <V.Container
      width="auto"
      maxWidth={240}
      padding={{
        vertical: 10,
        horizontal: 12,
      }}
      borderRadius={isSender ? "12px 2px 12px 12px" : "2px 12px 12px 12px"}
      backgroundColor={backgroundColor}
    >
      <Txt size={15} color={txtColor}>
        {message}
      </Txt>
    </V.Container>
  );
};

//
/// 파일다운로드
function useFileDownload(file: { title: string; file: string }) {
  return fetch(file.file)
    .then((response) => response.blob())
    .then((blob) => {
      const fileName = file.title; // 파일명을 file.title로 설정
      saveAs(blob, fileName);
    });
}
