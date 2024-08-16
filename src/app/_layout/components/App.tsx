import React, { ReactNode } from "react";

import { LoadingLayer, V } from "@/_ui";

//atoms
import { useRecoilValue } from "recoil";
import { loadingAtom } from "@/app/_layout/atoms/widgets-atom";

//components
import SEO from "@/seo.config";
import { AlartSnackbar } from "../../../libs/components/_custom/AlartSnackbar";
import BackDialog from "../../../libs/components/_custom/BackDialog";

//
type Props = {
  children: ReactNode;
};

//
export const App: React.FC<Props> = ({ children }: Props) => {
  const isLoading = useRecoilValue(loadingAtom);

  return (
    <>
      <SEO />

      <V.Column height="100%" minHeight="100%" flex="1 auto" id="layout">
        <main
          css={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          {children}
        </main>
      </V.Column>

      {/* 로딩 */}
      {isLoading && <LoadingLayer />}

      {/* alart */}
      <AlartSnackbar />

      {/* 뒤로가기 모달 */}
      <BackDialog />
    </>
  );
};
