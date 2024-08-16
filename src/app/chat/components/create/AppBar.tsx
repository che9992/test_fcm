import React from "react";
import { useRouter } from "next/router";

//libs
import { P, TouchableOpacity, Txt, V } from "@/_ui";

//
const AppBar = ({ onCreate }: { onCreate?: () => void }) => {
  const router = useRouter();
  const { step, category } = router.query ?? {};

  const tab = () => {
    if (category === "" && !step) return "다음";
    if (category === "" && step === "2") return "초대";

    return "초대";
  };

  const createChatRoom = () => {
    if ((!step || step === "1") && category === "") {
      router.push({ query: { ...router.query, step: 2 } });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onCreate && onCreate();
      console.log("asd");
    }
  };

  return (
    <P.Fixed
      width="100%"
      minHeight={60}
      maxHeight={60}
      position={{ top: 0, left: 0, right: 0 }}
      crossAlign="center"
      zIndex={10}
      css={{
        paddingTop: "env(safe-area-inset-top)",
        paddingRight: "env(safe-area-inset-right)",
        paddingLeft: "env(safe-area-inset-left)",
      }}
    >
      <V.Row
        align="center"
        crossAlign="space-between"
        backgroundColor="#fff"
        maxWidth={500}
        padding={{ horizontal: 20 }}
      >
        <TouchableOpacity txtColor="#aaa" onClick={() => router.back()}>
          뒤로
        </TouchableOpacity>

        <Txt size={18} weight="bold">
          {step === "2" ? "채팅초대" : "채팅방 생성"}
        </Txt>

        <TouchableOpacity
          as="button"
          disabled={category === undefined}
          css={{ fontWeight: "500" }}
          onClick={createChatRoom}
        >
          {tab()}
        </TouchableOpacity>
      </V.Row>
    </P.Fixed>
  );
};

export { AppBar };
