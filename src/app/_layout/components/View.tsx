import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { useSafeArea } from "../../../libs/hooks";

//assets
import Logo from "public/images/logo.svg";

//libs
import {
  AppBar,
  Avatar,
  Button,
  LoadingSpinner,
  P,
  Spacing,
  TouchableOpacity,
  Txt,
  V,
} from "@/_ui";
import { colors } from "../../../libs/themes";
import { BackIcon } from "../../../libs/assets/icon-stroke";
import { AddIcon, DirectIcon } from "../../../libs/assets/icon-fill";

//service
import service from "public/service.json";

//atom
import { useRecoilValue, useSetRecoilState } from "recoil";
import { scrollPositionAtom } from "../../../libs/hooks/useScrollPosition";
import { backRouteAtom } from "@/app/_layout/atoms/widgets-atom";
import { userProfileAtom } from "@/app/_layout/atoms/verify-atom";

//components
import BottomNavigationBar from "./BottomNavigationBar";
import MenuBar from "../../../libs/components/_custom/MenuBar";

//
type Props = {
  children?: ReactNode;
  appTitle?: string;
  backEvent?: () => void;
  addEvent?: () => void;
  category?: "서비스" | "문의하기" | "예약관리" | "콘텐츠";
  size?: { appbar?: number; section?: number };
  navigator?: boolean;
  loading?: boolean;
  backgroundColor?: string;
  activeCancelModal?: boolean;
  borderBottom?: string;
};

export default function View(props: Props) {
  const { navigator = true } = props;
  const router = useRouter();

  const setIsCancel = useSetRecoilState(backRouteAtom);
  const userData: any = useRecoilValue(userProfileAtom);

  const { chat } = userData?.bedge ?? {};

  const setResetScrollPosition = useSetRecoilState(scrollPositionAtom);
  const handlePositionReset = () => setResetScrollPosition(0);

  const backTabHandler = () => {
    if (props?.backEvent) return props?.backEvent();
    if (props?.activeCancelModal) return setIsCancel(true);

    return router.back();
  };

  return (
    <>
      {props.loading ? (
        <LoadingView />
      ) : (
        <>
          {/* 헤더 */}
          <AppBar
            serviceName="에듀셀파"
            width={props?.size?.appbar ?? 1100}
            borderBottom={props?.borderBottom}
          >
            {(!props.addEvent && !!props.backEvent) ||
            (!props.addEvent && !!props.activeCancelModal) ? (
              <P.Absolute position={{ left: 0 }} padding={{ left: 10 }}>
                <TouchableOpacity padding={{ all: 6 }} onClick={backTabHandler}>
                  <BackIcon size={20} />
                </TouchableOpacity>
              </P.Absolute>
            ) : (
              <P.Absolute position={{ left: 0 }} padding={{ left: 10 }}>
                {userData?.id === 1681 && (
                  <TouchableOpacity
                    padding={{ all: 6 }}
                    onClick={() => {
                      router.push("/chat");
                      handlePositionReset();
                    }}
                  >
                    <V.Column>
                      <DirectIcon size={24} fill="#9aa2b6" />

                      {chat && (
                        <P.Absolute
                          position={{ top: 0, right: 0 }}
                          maxWidth={8}
                          minWidth={8}
                          minHeight={8}
                          backgroundColor={colors.red}
                          borderRadius={100}
                        />
                      )}
                    </V.Column>
                  </TouchableOpacity>
                )}
              </P.Absolute>
            )}

            <P.Absolute position={{ left: "50%" as any }} axis={{ x: "-50%" }}>
              {props.appTitle ? (
                <Txt as="strong" size={18}>
                  {props?.appTitle}
                </Txt>
              ) : (
                <Logo
                  width="124px"
                  alt={service?.category}
                  onClick={() => router.push("/")}
                />
              )}
            </P.Absolute>

            <P.Absolute
              position={{ right: 0 }}
              gap={8}
              align="center"
              padding={{ right: 12 }}
            >
              {!!props.addEvent &&
                !props.backEvent &&
                !props.activeCancelModal && (
                  <TouchableOpacity
                    padding={{ all: 6 }}
                    onClick={() => props.addEvent && props.addEvent()}
                  >
                    <AddIcon size={25} />
                  </TouchableOpacity>
                )}

              {!props.backEvent && !props.activeCancelModal && (
                <TouchableOpacity
                  padding={{ all: 6 }}
                  onClick={() => {
                    router.push("/mypage");
                    handlePositionReset();
                  }}
                >
                  <Avatar
                    source={userData?.picture}
                    size={28}
                    alt={userData?.username}
                  />
                </TouchableOpacity>
              )}
            </P.Absolute>
          </AppBar>

          {/* 메뉴 */}
          {props?.category && MenuBar(props?.category ?? "서비스")}

          {/* 섹션 */}
          <V.Section>
            <V.Column
              align="center"
              flex={1}
              height="100%"
              minHeight="calc(100vh - 60px)"
              backgroundColor={props?.backgroundColor ?? "#fff"}
              maxWidth={props?.size?.section}
            >
              {props.children}
            </V.Column>
          </V.Section>

          {/* 바텀네비게이션바 */}
          {!!navigator && <BottomNavigationBar />}
        </>
      )}
    </>
  );
}

export const LoadingView = () => {
  const router = useRouter();
  const { bottom } = useSafeArea({ bottom: 40 });

  return (
    <V.Section>
      <V.Column
        align="center"
        height="100%"
        minHeight="100vh"
        maxHeight="100vh"
        crossAlign="center"
        padding={{ bottom }}
        flex={1}
      >
        <LoadingSpinner size={40} storkeSize={4} />
        <Spacing size={20} />
        <Txt as="b" size={18} color="#555">
          데이터 로딩 중입니다 ...
        </Txt>
        <Spacing size={10} />
        <Txt color="#999" size={14}>
          로딩이 길어질 경우 뒤로가기 하세요
        </Txt>
        <Spacing size={20} />
        <Button onClick={() => router.back()}>뒤로가기</Button>
      </V.Column>
    </V.Section>
  );
};
