/** @jsxImportSource @emotion/react */
import { NextRouter, useRouter } from "next/router";

import { colors } from "@/libs/themes/colors";

import { useRecoilState, useSetRecoilState } from "recoil";
import { scrollPositionAtom } from "../../../libs/hooks/useScrollPosition";
import { BottomNavigator, P, V } from "@/_ui";
import {
  CalenderIcon,
  CopyIcon,
  HomeIcon,
  MessageIcon,
  ServiceIcon,
  AlarmActiveIcon,
} from "@/libs/assets/icons";
import { ROUTE_PATH } from "../../../libs/utils/route_path";
import { userProfileAtom } from "@/app/_layout/atoms/verify-atom";

//
export default function BottomNavBar() {
  const router: NextRouter = useRouter();
  const { pathname } = router;
  const path = ROUTE_PATH;

  const [userData, setUserData] = useRecoilState(userProfileAtom);
  const { alarm } = userData?.bedge ?? {};

  const setResetScrollPosition = useSetRecoilState(scrollPositionAtom);
  const handlePositionReset = () => setResetScrollPosition(0);

  const 서비스 =
    pathname === path.서비스.학습관리.서비스 ||
    pathname === path.서비스.휴가내역 ||
    pathname === path.서비스.공지사항 ||
    pathname === path.서비스.자료실 ||
    pathname === path.서비스.식단표;

  const 문의하기 = pathname === path.문의하기;

  const 예약관리 =
    pathname === path.예약하기.컴퓨터 ||
    pathname === path.예약하기.전화 ||
    pathname === path.예약하기.운동 ||
    pathname === path.예약하기.심야자습 ||
    pathname === path.예약하기.나의예약;

  const 콘텐츠 =
    pathname === path.콘텐츠.콘텐츠 || pathname === path.콘텐츠.구매목록;

  return (
    <>
      <BottomNavigator maxWidth={600}>
        <BottomNavigator.Tab
          href="/"
          onClick={handlePositionReset}
          label="홈"
          css={{
            color: pathname === "/" ? colors.keyColor : colors.grey300,
          }}
        >
          <HomeIcon
            fill={pathname === "/" ? colors.keyColor : colors.grey300}
          />
        </BottomNavigator.Tab>

        <BottomNavigator.Tab
          href={path.서비스.학습관리.서비스}
          onClick={handlePositionReset}
          label="서비스"
          css={{ color: 서비스 ? colors.keyColor : colors.grey300 }}
        >
          <ServiceIcon fill={서비스 ? colors.keyColor : colors.grey300} />
        </BottomNavigator.Tab>

        <BottomNavigator.Tab
          href={path.문의하기}
          onClick={handlePositionReset}
          label="문의"
          css={{ color: 문의하기 ? colors.keyColor : colors.grey300 }}
        >
          <MessageIcon fill={문의하기 ? colors.keyColor : colors.grey300} />
        </BottomNavigator.Tab>

        <BottomNavigator.Tab
          href={path.예약하기.컴퓨터}
          onClick={handlePositionReset}
          label="예약"
          css={{ color: 예약관리 ? colors.keyColor : colors.grey300 }}
        >
          <CalenderIcon fill={예약관리 ? colors.keyColor : colors.grey300} />
        </BottomNavigator.Tab>

        <BottomNavigator.Tab
          href={path.알림}
          onClick={handlePositionReset}
          label="알림"
          bedge={alarm}
          css={{
            color: path.알림 === pathname ? colors.keyColor : colors.grey300,
          }}
        >
          <AlarmActiveIcon
            fill={path.알림 === pathname ? colors.keyColor : colors.grey300}
          />
        </BottomNavigator.Tab>

        <BottomNavigator.Tab
          href={path.콘텐츠.콘텐츠}
          onClick={handlePositionReset}
          label="콘텐츠"
          css={{ color: 콘텐츠 ? colors.keyColor : colors.grey300 }}
        >
          <CopyIcon fill={콘텐츠 ? colors.keyColor : colors.grey300} />
        </BottomNavigator.Tab>
      </BottomNavigator>
    </>
  );
}
