import { Button, Txt } from "@/_ui";
import { clearFcmToken } from "@/libs/provider/FcmProvider";
import { useRouter } from "next/router";
import React from "react";
import { V } from "react-layout-flexbox";

export default function IssueDoctor() {
  const router = useRouter();

  return (
    <V.Column
      padding={{ all: 20 }}
      margin={{ top: 30 }}
      backgroundColor="#f8f9fc"
      align="center"
      borderRadius={14}
      gap={20}
    >
      <Txt as="b" size={24}>
        잠깐!
      </Txt>

      <V.Column gap={8} align="center">
        <Txt as="strong" size={16} color="#666" txtAlign="center">
          푸시 알림 활성화 전 아래 버튼을 클릭하여 상태를 초기화 하세요
        </Txt>

        <Txt size={14} color="#888" txtAlign="center">
          초기화 버튼은 한번만 눌러도 충분해요✋
        </Txt>
      </V.Column>

      <Button
        as="m"
        onClick={() => clearFcmToken({ onSuccess: () => router.reload() })}
      >
        알림 상태 초기화
      </Button>
    </V.Column>
  );
}
