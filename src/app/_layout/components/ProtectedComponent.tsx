import React, { ReactNode, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { userProfileAtom } from "@/app/_layout/atoms/verify-atom";
import { useSetRecoilState } from "recoil";

import { useTanstackQuery } from "../../../libs/hooks/useTanstackQuery";
import { V } from "@/_ui";
import { LogoIcon } from "../../../libs/assets/icons";
import { getAppVerify } from "@/app/_layout/apis/verify";
import { useAxios } from "@/app/_layout/apis/_config";
import { useRouter } from "next/router";
import { usePlatformOs } from "../../../libs/hooks/usePlatformOs";
import { useLocalStorage, useSafeArea } from "../../../libs/hooks";
import { storage_keys } from "@/libs/utils/storage_keys";

export default function ProtectedComponent({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const axiosInstance = useAxios();
  const { status } = useSession();
  const { queryClient, useQuery, queryKey } = useTanstackQuery();
  const fcm_token = useLocalStorage(storage_keys.fcm_token).get();
  const os = usePlatformOs();

  const setuserProfileAtom = useSetRecoilState(userProfileAtom);

  //
  // 전역 관리자
  const { isLoading, data } = useQuery(
    [queryKey.사용자전역],
    () =>
      getAppVerify({
        axiosInstance,
        token: fcm_token ?? null,
        device: usePlatformOs(),
      }),
    {
      onSuccess: (data) => setuserProfileAtom({ status: "success", ...data }),
      enabled: status === "authenticated",
    }
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      queryClient.clear();
      queryClient.resetQueries();
      signOut({ redirect: false });
      router.push("/sign/login");
    }
  }, [status]);

  //
  //
  if (isLoading || status === "loading") {
    return <LoadingSplashView />;
  }

  if (status === "authenticated") {
    return children;
  }

  return null;
}

export const LoadingSplashView = () => {
  const { bottom } = useSafeArea({ bottom: 40 });

  return (
    <V.Section>
      <V.Column
        height="100%"
        flex={1}
        minHeight="100vh"
        maxHeight="100vh"
        align="center"
        crossAlign="center"
        padding={{ bottom }}
      >
        <LogoIcon width="180px" alt="에듀셀파" />
      </V.Column>
    </V.Section>
  );
};
