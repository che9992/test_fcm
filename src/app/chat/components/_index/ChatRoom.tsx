import React, { useRef } from "react";
import { useViewportHeight } from "@/libs/hooks";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//apis
import { getAllMessage } from "@/app/chat/apis/getAllMessage";

//libs
import { LoadingSpinner, Txt, V } from "@/_ui";

//components
import RoomAppBar from "../chat-room/RoomAppBar";
import { RoomDefaultView } from "../chat-room/RoomDefaultView";
import RoomField from "../chat-room/RoomField";
import ChatMessage from "../card/ChatMessage";

//atoms
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chatRoom_detail_atom,
  chatRoom_message_atom,
} from "@/app/chat/atoms/chat-atoms";

//
export default function ChatRoom() {
  const refs = useRef(null);
  const viewportHeight: any = useViewportHeight();
  const { router, axiosInstance } = useCore();
  const { useInfiniteQuery, queryKey, useInfiniteQueryObserver } =
    useTanstackQuery();

  const roomData: any = useRecoilValue(chatRoom_detail_atom);
  const [messages, setMessages] = useRecoilState(chatRoom_message_atom);

  //
  //  메시지
  const { data, fetchNextPage, isLoading } = useInfiniteQuery(
    [queryKey.채팅.메시지, router.query.id],
    async ({ pageParam = 0 }) =>
      getAllMessage({
        axiosInstance,
        roomId: router.query.id,
        pageToken: pageParam,
      }),
    {
      onSuccess: (data) => {
        const chatMessages = data.pages.map((page) => page.messages).flat();
        setMessages(chatMessages);
      },
      getNextPageParam: (lastPage) => {
        const { nextPageToken } = lastPage;
        if (nextPageToken !== -1) return nextPageToken;
        else return undefined;
      },
      enabled: !!router.query.id,
      keepPreviousData: true,
      refetchOnMount: "always",
      refetchInterval: 0,
      cacheTime: 0,
      staleTime: 0,
    }
  );

  useInfiniteQueryObserver({ data, ref: refs, fetchNextPage });

  return (
    <V.Column
      maxWidth={600}
      backgroundColor="#fff"
      css={{ height: viewportHeight + "px" }}
      gap={15}
    >
      {router.query.id ? (
        <>
          <RoomAppBar />

          {isLoading ? (
            <LoadingBox />
          ) : (
            <>
              <V.Column
                scroll={{ type: "auto", bar: true }}
                padding={{ horizontal: 20 }}
                gap={20}
                css={{
                  flex: 1,
                  flexDirection: "column-reverse",
                }}
              >
                {messages?.map((item: any) => (
                  <ChatMessage
                    type={item.messageType}
                    message={item?.message}
                    is_view={item?.is_view}
                    sender={item?.sender}
                    files={item?.file}
                    readCount={roomData?.chat_users_count - item?.readCount}
                    created_at={item?.created_at}
                  />
                ))}

                <div ref={refs} css={{ opacity: 0, fontSize: 1 }}>
                  refs
                </div>
              </V.Column>
              <RoomField roomStatus={roomData?.status} />
            </>
          )}
        </>
      ) : (
        <RoomDefaultView />
      )}
    </V.Column>
  );
}

const LoadingBox = () => (
  <V.Column
    flex={1}
    align="center"
    crossAlign="center"
    padding={{ bottom: 40 }}
    gap={15}
  >
    <LoadingSpinner size={40} />

    <Txt size={14} color="#999">
      메시지 가져오는 중 ...
    </Txt>
  </V.Column>
);
