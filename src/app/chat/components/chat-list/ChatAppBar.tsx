import React, { useState } from "react";
import { useRouter } from "next/router";

//libs
import { TouchableOpacity, Txt, V } from "@/_ui";

//components
import ChatFilters from "./ChatFilters";
import { HomeIcon } from "@/libs/assets/icon-fill";

//
export default function ChatAppBar({
  dataLength,
}: {
  dataLength: string | number;
}) {
  const [openFilter, setOpenFilter] = useState(false);
  const router = useRouter();

  return (
    <>
      <V.Row
        minHeight={60}
        align="center"
        crossAlign="space-between"
        padding={{ horizontal: 15 }}
      >
        <V.Row align="center" gap={8}>
          <TouchableOpacity
            padding={{ top: 6, bottom: 5, horizontal: 5 }}
            onClick={() => router.push("/")}
          >
            <HomeIcon size={18} fill="#aaa" />
          </TouchableOpacity>

          <Txt as="b">채팅{`(${dataLength})`}</Txt>
        </V.Row>

        <TouchableOpacity
          txtColor="#aaa"
          onClick={() => setOpenFilter(!openFilter)}
        >
          {!openFilter ? "필터 열기" : "닫기"}
        </TouchableOpacity>
      </V.Row>

      {openFilter && <ChatFilters />}
    </>
  );
}
