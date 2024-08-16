import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//libs
import { P, TouchableOpacity, Txt } from "@/_ui";
import { V } from "react-layout-flexbox";
import { colors, MQ } from "@/libs/themes";

//
const PwaInstall = ({ category }: { category?: string }) => {
  const router = useRouter();
  const { pathname } = router;

  const [installPromptEvent, setInstallPromptEvent] = useState<Event | null>(
    null
  );
  const [isInstalled, setIsInstalled] = useState(false);

  let navigator: any = typeof window !== "undefined" && window.navigator;
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !navigator.standalone;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  useEffect(() => {
    const status =
      navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches;
    setIsInstalled(status);

    if (!isIOS && isMobile) {
      const beforeInstallPromptHandler = (e: any) => {
        e.preventDefault();
        setInstallPromptEvent(e);
      };

      window.addEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
      return () =>
        window.removeEventListener(
          "beforeinstallprompt",
          beforeInstallPromptHandler
        );
    }
  }, [router.pathname]);

  //
  //
  const handleInstallClick = () => {
    if (installPromptEvent) {
      const promptEvent = installPromptEvent as any;
      promptEvent.prompt();
      promptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          setIsInstalled(true);
        }
        setInstallPromptEvent(null);
      });
    } else if (isIOS) {
      alert(
        "사파리에서 공유 버튼 클릭 후\n홈 화면 추가를 통해 앱을 설치하세요"
      );
    }
  };

  if (isInstalled) return null;

  return (
    <V.Row
      align="center"
      crossAlign="space-between"
      padding={{ all: 16 }}
      borderRadius={14}
      backgroundColor="#f8f9fc"
      margin={{ bottom: 30 }}
      gap={25}
      mediaQuery={{ s600: { direction: "column", align: "start" } }}
    >
      <V.Column gap={8} width="auto">
        <Txt as="b" size={18}>
          에듀셀파 {category && category + " "}앱 설치하기
        </Txt>
        <Txt size={14} color="#666">
          {
            "원활한 서비스 이용과 알림을 제공받으려면\n 앱을 설치하는 것을 권장해요"
          }
        </Txt>
      </V.Column>

      <TouchableOpacity
        onClick={handleInstallClick}
        padding={{ vertical: 10, horizontal: 14 }}
        borderRadius={100}
        backgroundColor={colors.keyColor}
        txtColor="#fff"
      >
        설치하기
      </TouchableOpacity>
    </V.Row>
  );
};

export default PwaInstall;
