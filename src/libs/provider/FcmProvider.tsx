import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import {
  deleteToken,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { storage_keys } from "../utils/storage_keys";

//firebase
import { firebaseApp } from "../utils/firebase";
import PwaProvider from "./PwaProvider";

//ui
import { Dialog } from "@/_ui";

//
export const VAPID_KEY =
  "BNjCQAJbEDhzZRYMRW-Tcs3tyCHN-RkT-lu86CciJWKZporhhkI_Gfk-OmNfzOLBAq1zHos-la2IBT5ya_B6k6E";

export default function FcmProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const fcmTokenStorage = useLocalStorage(storage_keys.fcm_token);
  const alarmModalStorage = useLocalStorage(storage_keys.fcm_alarm_popup);

  const [fcmToken, setFcmToken] = useState(fcmTokenStorage.get());
  const [showModal, setShowModal] = useState(
    alarmModalStorage.get() !== "true" && !fcmToken
  );

  //
  //
  useEffect(() => {
    if (typeof window !== "undefined") requestFcmToken();
  }, []);

  //
  //
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     requestFcmToken();

  //     if ("serviceWorker" in navigator) {
  //       const messaging = getMessaging(firebaseApp);

  //       const unsubscribe = onMessage(messaging, (payload) => {
  //         console.log("FCM 메시지 수신:", payload);
  //       });

  //       return () => unsubscribe();
  //     }
  //   }
  // }, []);

  const handleNextActiveNotifications = () => {
    setShowModal(false);
    alarmModalStorage.set("true");
  };

  return (
    <>
      <PwaProvider />

      {/* {!router.pathname.includes("sign") && (
        <Dialog
          open={showModal}
          onCancel={() => setShowModal(false)}
          title="알림 권한을 활성화"
          description={
            "현재 알람 권한이 처리되지 않았어요\n원활한 서비스 이용을 위해 알림을 활성화하는 것을 권장해요"
          }
          tab_direction="vertical"
          tabs={[
            {
              name: "활성화하기",
              onClick: () =>
                requestFcmToken({
                  onSuccess: () => setShowModal(false),
                  onFailed: () => {
                    console.log("asdasd");
                  },
                }),
            },
            {
              name: "다음에 하기",
              onClick: () => handleNextActiveNotifications(),
              buttonColor: "none",
              txtColor: "#999",
              height: 42,
            },
          ]}
        />
      )} */}

      {children}
    </>
  );
}

//
//
export const requestFcmToken = async ({
  onSuccess,
  onFailed,
}: { onSuccess?: any; onFailed?: any } = {}) => {
  const messaging = getMessaging(firebaseApp);

  const permission = await Notification.requestPermission();
  if (permission === "default" || permission === "denied") {
    onFailed?.();
    return;
  }

  console.log("permission", permission);

  getToken(messaging, { vapidKey: VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        useLocalStorage(storage_keys.fcm_token).set(currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) =>
      console.error("An error occurred while retrieving token. ", err)
    )
    .finally(() => {
      if (onSuccess) onSuccess();
    });

  onMessage(messaging, (payload) => console.log("FCM 메시지 호출", payload));

  return;
};

//
//
export const clearFcmToken = async ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const messaging = getMessaging(firebaseApp);
  deleteToken(messaging)
    .then(() => {
      console.log("Token deleted successfully.");
      useLocalStorage(storage_keys.fcm_token).remove();
      useLocalStorage(storage_keys.fcm_alarm_popup).remove();
      onSuccess?.();
    })
    .catch((err) => {
      console.error("Unable to delete token. ", err);
    });
};
