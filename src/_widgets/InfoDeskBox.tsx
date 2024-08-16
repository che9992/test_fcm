import { HTMLAttributes } from "react";
import { useRouter } from "next/router";

//libs
import { Txt } from "@/_ui";
import { V, ViewType } from "react-layout-flexbox";

//assets
import { ArrowIcon } from "@/libs/assets/icon-fill";
import { AlarmIcon, AppIcon, PenIcon } from "@/libs/assets/icon-color";

//types
type Types = {
  type: "알림" | "PWA" | "개선요청";
  backgroundColor?: string;
  routePath?: string;
  title?: string;
  description?: string;
} & HTMLAttributes<HTMLDivElement> &
  ViewType;

//
export default function InfoDeskBox({
  type,
  title,
  description,
  backgroundColor,
  routePath,
  ...props
}: Types) {
  const router = useRouter();

  const titles = () => {
    if (title) return title;
    if (type === "알림") return "푸시 알림이 오지 않아요";
    if (type === "PWA") return "어플로 사용하고 싶어요";
    if (type === "개선요청") return "인트라넷 개선 요청하기";
  };

  const txt = () => {
    if (description) return description;
    if (type === "알림") return "여기를 클릭하여 문제 해결 방법을 확인하세요";
    if (type === "PWA")
      return "인트라넷을 어플로 사용하고 싶다면, 여기를 확인하세요";
    if (type === "개선요청")
      return "불편함이 있거나 개선이 필요하다면 여기를 선택하세요";
  };

  const Icon = () => {
    if (type === "알림") return <AlarmIcon css={{ marginTop: 5 }} />;
    if (type === "PWA") return <AppIcon css={{ marginTop: 5 }} />;
    if (type === "개선요청") return <PenIcon css={{ marginTop: 5 }} />;
  };

  const bgTheme = () => {
    if (backgroundColor) return backgroundColor;
    if (type === "알림") return "#f0f2fb";
    return backgroundColor;
  };

  const path = () => {
    if (type === "알림") return "/infodesk/alarm";
    if (type === "PWA") return "/infodesk/pwa";
    if (type === "개선요청") return "/infodesk/feedback";
    return routePath;
  };

  return (
    <V.Row
      minWidth={280}
      align="center"
      padding={{ all: 16 }}
      backgroundColor={bgTheme()}
      borderRadius={14}
      onClick={() => router.push({ pathname: path() })}
      {...props}
    >
      <V.Row gap={20} padding={{ right: 16 }}>
        <V.Column width="auto" padding={{ top: 7 }}>
          <Icon />
        </V.Column>

        <V.Column gap={6}>
          <Txt as="b" size={16}>
            {titles()}
          </Txt>

          <Txt color="#888" size={14}>
            {txt()}
          </Txt>
        </V.Column>
      </V.Row>

      <ArrowIcon />
    </V.Row>
  );
}
