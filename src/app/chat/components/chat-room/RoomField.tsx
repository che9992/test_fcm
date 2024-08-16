import { useSafeArea, useTanstackQuery, useRef, useState } from "@/libs/hooks";
import { Input, LoadingSpinner, P, TouchableOpacity, V } from "@/_ui";
import { FileIcon } from "@/_ui/Input/send_field_icon/file-icon";
import {
  createFileMessage,
  createTextMessage,
} from "@/app/chat/apis/createChatMessage";
import { useCore } from "@/libs/provider/useCore";
import useCloudiReader from "@/libs/hooks/useCloudiReader";

export default function RoomField({
  roomStatus,
}: {
  roomStatus: "진행중" | "종료";
}) {
  const { axiosInstance, router } = useCore();
  const { useMutation, queryKey, queryClient } = useTanstackQuery();
  const refs = useRef(null);
  const [isText, setIsText] = useState("");
  const [isFile, setIsFile] = useState({ title: "", file: "" });

  //
  // 테스트 메시지 업로드
  const { mutate: onSendMessage } = useMutation({
    mutationFn: () =>
      createTextMessage({
        axiosInstance,
        id: router?.query?.id,
        message: isText,
      }),
    onSuccess: (data) => {
      console.log("메시지전송", data);
      setIsText("");
      queryClient.invalidateQueries([queryKey.채팅.리스트]);
      queryClient.invalidateQueries([queryKey.채팅.상세]);
      queryClient.invalidateQueries([queryKey.채팅.메시지]);
    },
  });

  //
  // 파일 이미지 업로드
  const { mutate: onSendFile } = useMutation({
    mutationFn: (file: any) =>
      createFileMessage({
        axiosInstance,
        id: router?.query?.id,
        file: file,
      }),
    onSuccess: (data) => {
      console.log("파일전송", data);
      queryClient.invalidateQueries([queryKey.채팅.리스트]);
      queryClient.invalidateQueries([queryKey.채팅.상세]);
      queryClient.invalidateQueries([queryKey.채팅.메시지]);
      setIsFile({ ...isFile, file: "", title: "" });
    },
  });

  const { status, uploadImageReader } = useCloudiReader({
    handleOnState: (imgUrl, fileName) => {
      setIsFile({ ...isFile, file: imgUrl, title: fileName });
      onSendFile({ file: imgUrl, title: fileName });
    },
  });

  return (
    <V.Row
      width="100%"
      padding={{ left: 5, right: 15, bottom: 25 }}
      align="end"
    >
      <TouchableOpacity
        minHeight={48}
        minWidth={48}
        align="center"
        crossAlign="center"
      >
        <input
          type="file"
          disabled={roomStatus === "종료" || status === "loading"}
          accept="image/jpg, image/jpeg, image/png , image/jfif , .pdf , .webp"
          onChange={uploadImageReader}
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 888,
            opacity: 0,
            cursor: "pointer !important",

            "&:disabled": { cursor: "default" },
          }}
        />
        {status === "loading" ? (
          <LoadingSpinner size={22} />
        ) : (
          <FileIcon size={22} />
        )}
      </TouchableOpacity>

      <Input.Textarea
        ref={refs}
        value={isText}
        disabled={roomStatus === "종료"}
        autoRaise
        onChange={(e) => setIsText(e.target.value)}
        placeholder="메시지를 입력하세요"
        sizes={{ borderRadius: 20 }}
        themes={{ focus: { backgroundColor: "#fff", borderColor: "#e2e2e2" } }}
        tab={{
          name: !!isText ? "전송" : "",
          disabled: roomStatus === "종료",
          onClick: () => onSendMessage(),
        }}
      />
    </V.Row>
  );
}
