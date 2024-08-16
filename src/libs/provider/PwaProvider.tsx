import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocalStorage, useSafeArea } from "../hooks";
import { storage_keys } from "../utils/storage_keys";

//libs
import { P, TouchableOpacity, Txt } from "@/_ui";
import { V } from "react-layout-flexbox";
import { colors, MQ } from "../themes";

//
const PwaProvider = () => {
  const router = useRouter();
  const { pathname } = router;
  const { bottom: safeAreaBottom } = useSafeArea({ bottom: 30 });

  const [installPromptEvent, setInstallPromptEvent] = useState<Event | null>(
    null
  );
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let navigator: any = typeof window !== "undefined" && window.navigator;
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !navigator.standalone;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  useEffect(() => {
    const skipPopup =
      useLocalStorage(storage_keys.fcm_download_ppopup).get() === "true";
    const status =
      navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches;
    setIsInstalled(status);

    if (!status && isMobile && !skipPopup && !pathname.includes("sign")) {
      setShowModal(true);
    }

    if (!isIOS && isMobile && !skipPopup) {
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
          setShowModal(false);
        }
        setInstallPromptEvent(null);
      });
    } else if (isIOS) {
      alert(
        "사파리에서 공유 버튼 클릭 후\n홈 화면 추가를 통해 앱을 설치하세요"
      );
    }
  };

  const handleCloseClick = () => {
    setShowModal(false);
    useLocalStorage(storage_keys.fcm_download_ppopup).set("true");
  };

  //
  //

  return (
    <>
      {!isInstalled && showModal && (isIOS || installPromptEvent) && (
        <P.Fixed
          width="100%"
          position={{ bottom: 0, left: 0, right: 0 }}
          zIndex={9999}
        >
          <V.Row
            align="center"
            crossAlign="space-between"
            padding={{ horizontal: 30, top: 30, bottom: safeAreaBottom }}
            backgroundColor="#fff"
            borderRadius="28px 28px 0 0"
            gap={12}
            crossGap={20}
            shadow={{ x: 0, y: -2, blur: 24, color: "#e9e9e9" }}
            mediaQuery={{ s768: { direction: "column" } }}
          >
            <V.Column
              gap={8}
              width="auto"
              mediaQuery={{ s768: { align: "center" } }}
            >
              <Txt as="b" size={18}>
                에듀셀파 앱 설치하기
              </Txt>
              <Txt
                size={14}
                color="#666"
                txtAlign="center"
                css={{
                  whiteSpace: "normal",
                  [MQ[3]]: { whiteSpace: "pre-line" },
                }}
              >
                {"원활한 서비스 이용을 위해\n 앱을 설치하는 것을 추천해요"}
              </Txt>
            </V.Column>

            <V.Row gap={8} width="auto">
              <TouchableOpacity
                onClick={handleCloseClick}
                padding={{ vertical: 10, horizontal: 14 }}
                borderRadius={100}
                backgroundColor="#eee"
                txtColor="#888"
              >
                나중에
              </TouchableOpacity>

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
          </V.Row>
        </P.Fixed>
      )}
    </>
  );
};

export default PwaProvider;
