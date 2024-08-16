import { useRouter } from "next/router";
import { useState } from "react";

//ui
import { V } from "react-layout-flexbox";

//components
import View from "@/app/_layout/components/View";
import ContentWrapper from "@/app/infodesk/ContentWrapper";
import Menus from "@/app/infodesk/Menus";
import IssueDoctor from "@/app/infodesk/IssueDoctor";

//
export default function Index() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <View
      navigator={false}
      backEvent={() => router.back()}
      borderBottom="1px solid #eee"
    >
      <Menus />

      <V.Column
        padding={{ top: 30, bottom: 40, horizontal: 20 }}
        maxWidth={720}
        height="100%"
        mediaQuery={{ s600: { padding: { top: 10 } } }}
        transitionTime={0.3}
      >
        {(!category || category === "웹") && (
          <ContentWrapper
            title={"웹 사이트\n푸시알림을 활성화하는 방법"}
            txt="🙏 원활한 서비스 이용을 위해 Google Chrome 사용을 권장해요!"
            cotents={[
              {
                image: "/images/infodesk/웹알림.png",
                title: "푸시 알림을 재설정하는 방법",
                txts: [
                  "웹사이트 주소창 좌측 옆에 표시된 아이콘을 선택합니다",
                  "드롭다운 된 박스 내에 표시된 알림을 활성화 합니다",
                  "활성화 이후 원활한 동작을 위해 웹사이트를 새로고침 하세요",
                ],
              },
              {
                image: "/images/infodesk/웹알림2.png",
                title: "권한 재설정 또는 최초 방문",
                txts: [
                  "웹사이트를 최초 방문 또는 이전 이미지에 존재하는 권한 재설정 클릭",
                  "위 이미지와 같은 안내 모달이 웹사이트 주소창에 노출됩니다",
                  "허용을 선택하여 푸시 알림을 활성화 하세요",
                ],
              },
            ]}
          />
        )}

        {category === "안드로이드" && (
          <ContentWrapper
            category="안드로이드"
            title={"안드로이드 기기\n푸시알림을 활성화하는 방법"}
            cotents={[
              {
                image: "/images/infodesk/안드로이드알림.png",
                title: "푸시 알림을 최초 등록하는 방법",
                txts: [
                  "인트라넷 앱 설치 후 최초 앱 동작 시 알림 팝업이 노출됩니다",
                  "허용을 선택하여 푸시 알림을 활성화 하세요",
                ],
              },
              {
                title: "알림을 차단 및 거부한 경우",
                txts: [
                  "설치한 어플리케이션을 삭제 후 재설치 합니다",
                  "이후 앱 동작 시 노출되는 알림 팝업의 허용을 선택합니다",
                ],
              },
            ]}
          />
        )}

        {category === "IOS" && (
          <ContentWrapper
            category="IOS"
            title={"IOS 기기\n푸시알림을 활성화하는 방법"}
            cotents={[
              {
                image: "/images/infodesk/ios알림2.png",
                title: "알림을 차단 및 거부한 경우",
                txts: [
                  "마이페이지 에서 직접 알림 권한을 요청합니다",
                  "노출되는 팝업 내에 허용을 선택하여 알림을 활성화 하세요",
                  "'1,2번'이 불가능한 경우, 설치한 어플리케이션을 삭제 후 재설치 합니다",
                  "이후 앱 동작 시 노출되는 알림 팝업의 허용을 선택합니다",
                ],
              },
            ]}
          />
        )}

        <IssueDoctor />
      </V.Column>
    </View>
  );
}

Index.auth = true;
