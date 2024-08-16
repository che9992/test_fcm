import React, { useEffect, useState } from "react";

export function useNotification() {
  const [status, setStatus] = useState<"granted" | "dennied" | "default">(
    "default"
  );

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission: any) => {
        setStatus(permission);
      });
    }
  }, []);

  return { status };
}

// granted 권한 승인
// dennied 권한 미승인
// default 권한을 요청할 수 있는 상태
