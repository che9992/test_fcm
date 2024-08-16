import { useRouter } from "next/router";
import { useState } from "react";

//ui
import { V } from "react-layout-flexbox";

//components
import View from "@/app/_layout/components/View";
import ContentWrapper from "@/app/infodesk/ContentWrapper";
import Menus from "@/app/infodesk/Menus";
import IssueDoctor from "@/app/infodesk/IssueDoctor";
import PwaInstall from "@/app/infodesk/PwaInstall";

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
        padding={{ top: 10, bottom: 40, horizontal: 20 }}
        maxWidth={720}
        height="100%"
        transitionTime={0.3}
      >
        {(!category || category === "웹") && (
          <>
            <ContentWrapper
              title={"데스크탑\n앱을 설치하는 방법"}
              txt="🙏 원활한 서비스 이용을 위해 Google Chrome 사용을 권장해요!"
              cotents={[
                {
                  image: "/images/infodesk/웹설치.png",
                  title: "웹 어플리케이션 설치 방법",
                  txts: [
                    "웹사이트 주소창 우측에 표시된 모니터 아이콘을 클릭합니다",
                    "노출된 앱 설치 팝업에서 설치를 클릭하면 즉시 다운로드 됩니다",
                  ],
                },
              ]}
            />
          </>
        )}

        {category === "안드로이드" && (
          <>
            <PwaInstall category="안드로이드" />
            <ContentWrapper
              title={"안드로이드\n앱을 설치하는 방법"}
              txt="🙏 원활한 서비스 이용을 위해 Google Chrome 사용을 권장해요!"
              cotents={[
                {
                  //   image: "/images/infodesk/안드로이드알림.png",
                  title: "어플리케이션 설치 방법",
                  txts: [
                    "주소창 URL 옆 '...' 아이콘을 선택합니다",
                    "모달 내에 홈 화면에 추가 기능을 선택합니다",
                    "앱을 홈에 추가하면, 정상적으로 설치가 완료됩니다",
                  ],
                },
              ]}
            />
          </>
        )}

        {category === "IOS" && (
          <ContentWrapper
            title={"IOS\n앱을 설치하는 방법"}
            txt="🙏 원활한 서비스 이용을 위해 Safari 브라우저 사용을 권장해요!"
            cotents={[
              {
                image: "/images/infodesk/ios설치.png",
                title: "어플리케이션 설치 방법",
                txts: [
                  "사파리 브라우저 하단에 중앙 다운로드 아이콘을 선택합니다",
                  "모달 내에 홈 화면에 추가 기능을 선택합니다",
                  "앱을 홈에 추가하면, 정상적으로 설치가 완료됩니다",
                ],
              },
            ]}
          />
        )}
      </V.Column>
    </View>
  );
}

Index.auth = true;
