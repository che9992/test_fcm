/** @jsxImportSource @emotion/react */
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  HTMLAttributes,
} from "react";
import { BlurLayer } from "../display/BlurLayer";
import { IconTab } from "../tab/IconTab";
import { P } from "../flex/P";
import { V } from "../flex/V";
import { MQ } from "@/libs/themes";

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  theme?: "light" | "dark";
  open: boolean;
  onCancel: () => void;
  modalSize?: number;
  clickOutSideClose?: boolean;
  windowScreenScroll?: boolean;
  showCancelTab?: boolean;
  zIndex?: number;
}

export const Modal = (props: Props) => {
  const {
    theme = "light",
    modalSize = 560,
    open,
    onCancel,
    windowScreenScroll = true,
    clickOutSideClose = true,
    showCancelTab = true,
    zIndex,
    ...rest
  } = props;
  const ref = useRef<HTMLDivElement>(null);

  const THEME_VARIANT = {
    light: { bg: "#fff", cancelColor: "#ccc" },
    dark: { bg: "#222", cancelColor: "#555" },
  };

  //
  // 외부 모달 닫기
  const clickModalOutside = useCallback(
    (event: MouseEvent) => {
      if (clickOutSideClose)
        if (open && ref.current && !ref.current.contains(event.target as Node))
          onCancel();
    },
    [open, onCancel]
  );

  useEffect(() => {
    if (windowScreenScroll) {
      if (open) document.body.style.overflowY = "hidden";
      else document.body.style.overflowY = "auto";
    } else true;

    document.addEventListener("mousedown", clickModalOutside);
    return () => document.removeEventListener("mousedown", clickModalOutside);
  }, [open, windowScreenScroll]);

  return (
    <>
      {open && <BlurLayer zIndex={zIndex ? zIndex - 1 : 9998} />}

      <P.Fixed
        zIndex={zIndex ?? 9999}
        width="100%"
        height="100%"
        position={{
          right: 0,
          left: 0,
          top: open ? 0 : ("150%" as any),
        }}
        padding={{ all: 20 }}
        align="center"
        crossAlign="center"
        transitionTime={0.3}
        css={{
          overscrollBehavior: "contain",
          [MQ[2]]: { padding: "40px 0 0" },
        }}
      >
        <V.Container
          maxWidth={modalSize}
          minWidth={320}
          maxHeight={700}
          borderRadius={26}
          backgroundColor={THEME_VARIANT[theme].bg}
          ref={ref}
          scroll={{ type: "auto" }}
          css={{
            overscrollBehavior: "contain",
            [MQ[2]]: {
              height: "100%",
              maxHeight: "100%",
              borderRadius: "30px 30px 0 0",
              paddingBottom: "env(safe-area-inset-bottom)",
            },
          }}
          {...rest}
        >
          {showCancelTab && (
            <P.Sticky
              width="100%"
              position={{ right: 0, left: 0, top: 0 }}
              zIndex={5}
            >
              <V.Column align="end" padding={{ all: 6 }}>
                <IconTab onClick={onCancel}>
                  <CancelIcon fill={THEME_VARIANT[theme].cancelColor} />
                </IconTab>
              </V.Column>
            </P.Sticky>
          )}

          {props.children}
        </V.Container>
      </P.Fixed>
    </>
  );
};

// ----------------------------------
// -------------- Icon --------------
// ----------------------------------
function CancelIcon({ fill = "#ccc" }: { fill?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 22.001C17.0751 22.001 22 17.0761 22 11.001C22 4.92587 17.0751 0.00100708 11 0.00100708C4.92487 0.00100708 0 4.92587 0 11.001C0 17.0761 4.92487 22.001 11 22.001Z"
        fill="white"
      />
      <path
        d="M18.779 3.222C17.2407 1.68358 15.2807 0.63588 13.1468 0.211403C11.013 -0.213075 8.80128 0.00473368 6.79127 0.837283C4.78125 1.66983 3.06326 3.07973 1.85454 4.88868C0.645823 6.69763 0.000671387 8.82439 0.000671387 11C0.000671387 13.1756 0.645823 15.3024 1.85454 17.1113C3.06326 18.9203 4.78125 20.3302 6.79127 21.1627C8.80128 21.9953 11.013 22.2131 13.1468 21.7886C15.2807 21.3641 17.2407 20.3164 18.779 18.778C20.8418 16.7151 22.0007 13.9173 22.0007 11C22.0007 8.08271 20.8418 5.28489 18.779 3.222ZM13.217 14.507L11.001 12.291L8.78302 14.508C8.61087 14.6745 8.38017 14.7668 8.14065 14.7648C7.90114 14.7628 7.67199 14.6668 7.50262 14.4974C7.33325 14.328 7.23722 14.0989 7.23524 13.8594C7.23326 13.6199 7.32548 13.3892 7.49202 13.217L9.71002 10.999L7.49702 8.78601C7.33048 8.61386 7.23826 8.38315 7.24024 8.14364C7.24222 7.90412 7.33825 7.67497 7.50762 7.50561C7.67699 7.33624 7.90613 7.24021 8.14565 7.23823C8.38517 7.23624 8.61587 7.32846 8.78802 7.49501L11.001 9.70901L13.214 7.496C13.3861 7.33171 13.6157 7.24128 13.8536 7.24405C14.0916 7.24682 14.319 7.34256 14.4872 7.51081C14.6555 7.67907 14.7512 7.90647 14.754 8.14439C14.7567 8.38232 14.6663 8.61189 14.502 8.78401L12.289 10.997L14.507 13.213C14.6736 13.3852 14.7658 13.6159 14.7638 13.8554C14.7618 14.0949 14.6658 14.324 14.4964 14.4934C14.3271 14.6628 14.0979 14.7588 13.8584 14.7608C13.6189 14.7628 13.3882 14.6705 13.216 14.504"
        fill={fill}
      />
    </svg>
  );
}
