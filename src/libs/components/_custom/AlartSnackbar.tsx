import React, { forwardRef, useEffect, useRef } from "react";

//libs
import { P, TouchableOpacity, Txt, TxtSpan, V } from "@/_ui";
import { borderRadius, colors, MQ } from "@/libs/themes";

//assets
import { useRecoilState } from "recoil";
import { alartContextAtom, alartAtom } from "@/app/_layout/atoms/widgets-atom";
import { CancelIcon } from "@/libs/assets/icon-fill";

//
export const AlartSnackbar = forwardRef(function AlartSnackbar({}) {
  const [isAlart, setIsAlart] = useRecoilState(alartAtom);
  const [isContext, setIsContext] = useRecoilState(alartContextAtom);

  const handleOnCancel = () => {
    setIsAlart(false);
    setIsContext({ title: "", context: "" });
  };

  // 모달 고정 및 외부 클릭감지
  const snackRef = useRef<HTMLDivElement>(null);
  const clickModalOutside = (event: MouseEvent) => {
    if (isAlart && !snackRef.current?.contains(event.target as Node)) {
      handleOnCancel();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);
    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  }, [isAlart]);

  return (
    <>
      {isAlart && (
        <P.Fixed
          zIndex={9999}
          position={{ top: 0, left: "50%" as any }}
          padding={{ vertical: 30, horizontal: 15 }}
          axis={{ x: "-50%" }}
          align="start"
          css={{ [MQ[3]]: { top: "auto", bottom: "0" } }}
          ref={snackRef}
        >
          <V.Column
            align="start"
            backgroundColor="#fff"
            borderRadius={16}
            shadow={{ x: 0, y: 3, blur: 30, color: "#ccc" }}
          >
            {/* tab */}

            <TouchableOpacity
              onClick={() => handleOnCancel()}
              css={{ zIndex: 20, position: "absolute", right: 6, top: 6 }}
            >
              <CancelIcon size={16} fill="#ccc" />
            </TouchableOpacity>

            {/* view */}
            <V.Column
              maxWidth={480}
              minWidth={280}
              align="start"
              gap={3}
              padding={{ vertical: 16, left: 16, right: 26 }}
            >
              <Txt css={{ fontWeight: "600" }}>
                {!!isContext?.title
                  ? isContext?.title
                  : "👍 요청하신 처리가 완료되었습니다!"}
              </Txt>
              <TxtSpan>
                {!!isContext?.context
                  ? isContext?.context
                  : "해당 팝업은 아무 곳이나 클릭해도 사라져요!"}
              </TxtSpan>
            </V.Column>
          </V.Column>
        </P.Fixed>
      )}
    </>
  );
});

// styled
const theme = {
  container: {
    maxWidth: "480px",
    zIndex: "99999",
    position: "fixed",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "30px 20px",
    overflowY: "auto",

    "::-webkit-scrollbar": {
      display: "none",
    },

    [MQ[3]]: {
      top: "auto",
      bottom: "0",
    },
  },

  wrap: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.s600,
    boxShadow: "0 3px 30px rgba(0, 0, 0, 0.12)",
  },

  tabBox: {
    zIndex: "500",
    width: "auto",
    position: "absolute",
    top: "6px",
    right: "6px",
  },
};
