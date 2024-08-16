import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useState } from "react";

//hooks
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

//components
import { App } from "@/app/_layout/components/App";
import { GlobalThemes } from "@/app/_layout/components/GlobalThemes";

const ProtectedComponent = dynamic(
  () => import("@/app/_layout/components/ProtectedComponent"),
  {
    ssr: false,
  }
);
const FcmProvider = dynamic(() => import("@/libs/provider/FcmProvider"), {
  ssr: false,
});

//
export default function MyApp({ Component, pageProps }: AppProps) {
  const [client] = useState(() => new QueryClient());
  const dehydratedState = dehydrate(client);

  return (
    <>
      <SessionProvider session={pageProps.session} basePath="/api/auth">
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <RecoilRoot>
              <GlobalThemes>
                <App>
                  {(Component as any).auth ? (
                    <FcmProvider>
                      <ProtectedComponent>
                        <Component {...pageProps} />
                      </ProtectedComponent>
                    </FcmProvider>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </App>
              </GlobalThemes>
            </RecoilRoot>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
