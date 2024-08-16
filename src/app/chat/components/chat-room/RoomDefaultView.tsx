import React from "react";
import { useRouter } from "next/router";

//libs
import { TouchableOpacity, Txt, V } from "@/_ui";
import { MQ } from "@/libs/themes";

//
const RoomDefaultView = () => {
  const router = useRouter();

  return (
    <V.Column
      align="center"
      crossAlign="center"
      height="100%"
      flex={1}
      gap={6}
      padding={{ bottom: 40 }}
    >
      <Txt size={14} color="#aaa">
        채팅방을 선택하세요
      </Txt>

      <TouchableOpacity
        txtSize={13}
        onClick={() => router.back()}
        css={{ display: "none", [MQ[3]]: { display: "flex" } }}
      >
        뒤로가기
      </TouchableOpacity>
    </V.Column>
  );
};

export { RoomDefaultView };
