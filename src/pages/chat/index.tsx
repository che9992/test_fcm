import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//apis
import { getAllChatList } from "@/app/chat/apis/getAllChatList";

//atoms
import { useSetRecoilState } from "recoil";
import { chatRoom_list_atom } from "@/app/chat/atoms/chat-atoms";

//libs
import { Divider, V } from "@/_ui";
import { MQ } from "@/libs/themes";

//components
const ChatList = dynamic(import("@/app/chat/components/_index/ChatList"), {
  ssr: false,
});
const ChatRoom = dynamic(import("@/app/chat/components/_index/ChatRoom"), {
  ssr: false,
});
const ChatDetail = dynamic(import("@/app/chat/components/_index/ChatDetail"), {
  ssr: false,
});

import { LoadingView } from "@/app/_layout/components/View";

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
  const { axiosInstance, router, status } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();

  const { group, read, search, page } = router.query ?? {};

  const setChatList = useSetRecoilState(chatRoom_list_atom);

  //
  // 채팅방 리스트
  const { data: chatList, isLoading: chatList_loading } = useQuery({
    queryKey: [queryKey.채팅.리스트, { ...router.query }],
    queryFn: () =>
      getAllChatList({
        axiosInstance,
        search,
        status: router.query.status,
        group: group === "true" ? true : group === "false" ? false : null,
        read: read === "true" ? true : read === "false" ? false : null,
        page,
      }),
    onSuccess: (data) => setChatList(data?.results?.results),
    keepPreviousData: true,
    refetchOnMount: "always",
    refetchInterval: 0,
    enabled: status === "authenticated",
  });

  if (chatList_loading) return <LoadingView />;

  return (
    <V.Section
      backgroundColor="#f8f9fc"
      flex={1}
      css={{ [MQ[1]]: { backgroundColor: "#fff" } }}
    >
      <V.Row align="start" maxWidth={1240}>
        <ChatList dataLength={chatList?.count} data={chatList?.results} />

        <V.Row css={{ [MQ[1]]: { display: "none" } }}>
          <Divider direction="vertical" width={1} height={"100vh" as any} />

          <ChatRoom />

          <Divider direction="vertical" width={1} height={"100vh" as any} />

          <ChatDetail />
        </V.Row>
      </V.Row>
    </V.Section>
  );
}

Index.auth = true;
