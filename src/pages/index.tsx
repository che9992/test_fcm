import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import React, { ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useScrollPosition } from "@/libs/hooks/useScrollPosition";
import { useCore } from "@/libs/provider/useCore";

//apis
import { getAllDatas } from "@/app/home/apis/getAllDatas";

//libs
import { TouchableOpacity, Txt } from "@/_ui";
import { V } from "react-layout-flexbox";

//compnents
import InfoDeskBox from "@/_widgets/InfoDeskBox";
import View from "@/app/_layout/components/View";
import Event from "@/app/home/components/Event";

//csr
const options = { ssr: false };

const Reservation = dynamic(
  import("@/app/home/components/Reservation"),
  options
);
const Notice = dynamic(import("@/app/home/components/Notice"), options);
const Library = dynamic(import("@/app/home/components/Library"), options);
const Counsoult = dynamic(import("@/app/home/components/Counsoult"), options);
const Faq = dynamic(import("@/app/home/components/Faq"), options);

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  const path = context.req.url;
  const fullUrl = `${protocol}://${host}${path}`;

  const userAgent = context.req.headers["user-agent"] || "";

  if (userAgent.includes("KAKAOTALK")) {
    return {
      redirect: {
        destination: `kakaotalk://web/openExternal?url=${encodeURIComponent(
          fullUrl
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

//
export default function Index() {
  const { axiosInstance, status } = useCore();

  const [thisScroll, setThisScroll] = useState(0);

  const { data, isLoading } = useQuery(
    ["index-main"],
    () => getAllDatas({ axiosInstance }),
    {
      onSuccess: (data) => {},
      onError: (err) => {},
      keepPreviousData: true,
      enabled: status === "authenticated",
    }
  );

  useScrollPosition({
    position: thisScroll,
    handler: () => setThisScroll(window.pageYOffset),
  });

  return (
    <View loading={isLoading}>
      <V.Column
        width="100%"
        flex={1}
        align="center"
        backgroundColor="#f8f8f8"
        padding={{ vertical: 40, horizontal: 15 }}
        mediaQuery={{
          s1080: { padding: { top: 20, bottom: 30, horizontal: 15 } },
        }}
      >
        <V.Column maxWidth={960} gap={14} crossGap={14}>
          <V.ScrollDragHorizontal gap={15}>
            <InfoDeskBox type="알림" maxWidth={310} backgroundColor="#fff" />
            <InfoDeskBox type="PWA" maxWidth={310} backgroundColor="#fff" />
            <InfoDeskBox
              type="개선요청"
              maxWidth={310}
              backgroundColor="#fff"
            />
          </V.ScrollDragHorizontal>

          <Event data={data?.upcoming_schedules} />

          <V.Row
            gap={16}
            crossGap={16}
            mediaQuery={{ s768: { direction: "column" } }}
          >
            <V.Column gap={14}>
              <Notice data={data?.recent_notices} />
              <Library data={data?.recent_handouts} />
            </V.Column>

            <V.Column gap={14}>
              <Reservation data={data?.my_reservations} />
              <Counsoult data={data?.my_consultations} />
              <Faq data={data?.my_inquiries} />
            </V.Column>
          </V.Row>
        </V.Column>
      </V.Column>
    </View>
  );
}

Index.auth = true;

export const HomeBox = ({
  title,
  titleRoute,
  children,
}: {
  title?: string;
  titleRoute?: () => void;
  children: ReactNode;
}) => (
  <V.Column
    borderRadius={16}
    backgroundColor="#fff"
    padding={{ vertical: 24, horizontal: 20 }}
  >
    {!!title && (
      <V.Row align="center" crossAlign="space-between" padding={{ bottom: 18 }}>
        <Txt as="b" size={18}>
          {title}
        </Txt>

        {!!titleRoute && (
          <TouchableOpacity
            onClick={() => titleRoute()}
            txtColor="#888"
            txtSize={13}
            padding={{ vertical: 5 }}
          >
            더보기
          </TouchableOpacity>
        )}
      </V.Row>
    )}

    {children}
  </V.Column>
);
