"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { Interpolation, Theme } from "@emotion/react";

//libs
import { colors, fontSize, MQ } from "@/libs/themes";
import { P, V } from "@/_ui";
import { ROUTE_PATH } from "@/libs/utils/route_path";

//
export default function MenuBar(page: string) {
  const router: NextRouter = useRouter();
  const { pathname } = router;
  const path = ROUTE_PATH;

  if (page === "서비스") {
    return (
      <Wrapping>
        {[
          { path: path.서비스.학습관리.서비스, name: "학습관리" },
          { path: path.서비스.휴가내역, name: "휴가내역" },
          { path: path.서비스.공지사항, name: "공지사항" },
          { path: path.서비스.자료실, name: "자료실" },
          { path: path.서비스.식단표, name: "식단표" },
        ].map((item) => (
          <Link href={item.path} css={[LinkTheme(pathname === item.path)]}>
            {item?.name}
          </Link>
        ))}
      </Wrapping>
    );
  }

  if (page === "예약관리") {
    return (
      <Wrapping>
        {[
          { path: path.예약하기.컴퓨터, name: "컴퓨터" },
          { path: path.예약하기.전화, name: "전화" },
          { path: path.예약하기.운동, name: "운동" },
          { path: path.예약하기.심야자습, name: "심야자습" },
          { path: path.예약하기.나의예약, name: "나의예약" },
        ].map((item) => (
          <Link href={item.path} css={[LinkTheme(pathname === item.path)]}>
            {item?.name}
          </Link>
        ))}
      </Wrapping>
    );
  }

  if (page === "콘텐츠") {
    return (
      <Wrapping>
        {[
          { path: path.콘텐츠.콘텐츠, name: "콘텐츠" },
          { path: path.콘텐츠.구매목록, name: "구매내역" },
        ].map((item) => (
          <Link href={item.path} css={[LinkTheme(pathname === item.path)]}>
            {item?.name}
          </Link>
        ))}
      </Wrapping>
    );
  }
}

const Wrapping = ({ children }: { children: ReactNode }) => (
  <P.Sticky
    width="100%"
    position={{ top: 60, left: 0, right: 0 }}
    zIndex={999}
    align="start"
    crossAlign="center"
    padding={{ horizontal: 10 }}
    backgroundColor="#fff"
    css={{ [MQ[2]]: { justifyContent: "start" } }}
  >
    <V.Row
      padding={{ horizontal: 5, vertical: 5 }}
      gap={10}
      crossAlign="center"
      css={{ [MQ[2]]: { display: "none" } }}
    >
      {children}
    </V.Row>

    <V.Row
      padding={{ horizontal: 5, vertical: 5 }}
      css={{ display: "none", [MQ[2]]: { display: "flex" } }}
    >
      <V.ScrollDragHorizontal gap={10}>{children}</V.ScrollDragHorizontal>
    </V.Row>
  </P.Sticky>
);

function LinkTheme(active: boolean): Interpolation<Theme> {
  return {
    fontSize: fontSize.s15,
    padding: "10px 12px",
    color: active ? colors.white : colors.grey500,
    border: `1px solid ${active ? colors.none : colors.grey200}`,
    backgroundColor: active ? colors.keyColor : colors.white,
    borderRadius: 14,
  };
}
