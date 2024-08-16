import { useRouter } from "next/router";
import { useState } from "react";
import { storage_keys } from "@/libs/utils/storage_keys";
import { usePlatformOs, useLocalStorage } from "@/libs/hooks";
import { requestFcmToken } from "@/libs/provider/FcmProvider";

//libs
import { Divider, TouchableOpacity, Txt, TxtSpan, V } from "@/_ui";
import { colors } from "@/libs/themes";

//
export default function MyPushBox() {
  const router = useRouter();
  const os = usePlatformOs();
  const ios = os === "ios";
  const PC = os === "PC";

  const fcm_token = useLocalStorage(storage_keys.fcm_token).get();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <V.Column
        margin={{ top: 10, bottom: 20 }}
        padding={{ all: 18 }}
        gap={6}
        borderRadius={16}
        backgroundColor="#f8f9fc"
        border={{ solid: 1, color: "#e2e2e2" }}
      >
        {!fcm_token && (
          <>
            <V.Column>
              <Txt
                color={colors.keyColor}
                size={16}
                weight="medium"
                padding={{ bottom: 10 }}
              >
                알림 권한을 반드시 허용해주세요
              </Txt>

              {!PC && (
                <Txt size={14} color="#777" lineHeight={1.65}>
                  ✅ 원활한 서비스를 위해 반드시 앱을 설치하세요
                </Txt>
              )}

              <Txt size={14} color="#777" lineHeight={1.65}>
                ✅ 권한을 허용하지 않을 경우 서비스를 정상적으로 제공받을 수
                없습니다
              </Txt>

              {ios && (
                <>
                  {!fcm_token && (
                    <Txt size={14} color={colors.grey800} lineHeight={1.65}>
                      IOS 기기는 반드시 아래 <b>{"[알림 권한 요청하기]"}</b>를
                      클릭해주세요
                    </Txt>
                  )}
                </>
              )}
            </V.Column>

            <Divider spacing={{ vertical: 8 }} color="#e2e2e2" />
          </>
        )}

        <Txt size={14} color="#777" lineHeight={1.65}>
          <b> {"[⛔ 알림이 오지 않는 경우엔?]"}</b>
          <br />
          앱을 삭제 후 다시 설치하여 알림 권한을 허락으로 선택하세요
        </Txt>

        {!!fcm_token && (
          <TxtSpan>허용된 토큰 정보 : {fcm_token?.slice(0, 20)} ...</TxtSpan>
        )}

        {ios && (
          <>
            {!fcm_token && (
              <>
                <TouchableOpacity
                  onClick={() => {
                    setLoading(true);
                    requestFcmToken({
                      onSuccess: () => {
                        setLoading(false);
                        router.reload();
                      },
                    });
                  }}
                  backgroundColor="#e3e8f8"
                  padding={{ vertical: 8, horizontal: 12 }}
                  borderRadius={12}
                  margin={{ top: 12 }}
                >
                  <Txt color={colors.keyColor} weight="medium">
                    {loading ? "알람 권한 설정 중 ..." : "알림 권한 요청하기"}
                  </Txt>
                </TouchableOpacity>

                {loading && (
                  <Txt size={13} color="#666">
                    알람 권한 설정이 완료되면 페이지가 리로드 됩니다
                  </Txt>
                )}
              </>
            )}
          </>
        )}
      </V.Column>
    </>
  );
}
