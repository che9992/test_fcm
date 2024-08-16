import React, { useEffect } from "react";
import { useMoment } from "@/libs/hooks";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getChatRoom } from "@/app/chat/apis/getChatRoom";

//apis
import { getSortedChatUsers } from "@/app/chat/utils/sortedUser";

//libs
import { LoadingSpinner, Txt, V } from "@/_ui";

//atoms
import {
  chatRoom_detail_atom,
  chatRoom_detail_loading_atom,
} from "@/app/chat/atoms/chat-atoms";
import { useSetRecoilState } from "recoil";

//components
import StatusBar from "../chat-detail/StatusBar";
import UserCard from "../card/UserCard";

//
export default function ChatDetail() {
  const { axiosInstance, router } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();

  const setChatRoomDetail = useSetRecoilState(chatRoom_detail_atom);
  const setChatRoomLoading = useSetRecoilState(chatRoom_detail_loading_atom);

  //
  // 채팅방 상세
  const { data, isLoading } = useQuery({
    queryKey: [queryKey.채팅.상세, router?.query?.id],
    queryFn: () => getChatRoom({ axiosInstance, id: router?.query?.id }),
    onSuccess: (data) => setChatRoomDetail(data),
    enabled: !!router.query.id,
    keepPreviousData: true,
    refetchOnMount: "always",
    refetchInterval: 0,
    cacheTime: 0,
    staleTime: 0,
  });

  const { status, initiator, chat_users, chat_users_count, memo } = data ?? {};

  const sortedChatUsers: any = getSortedChatUsers({ chat_users, initiator });

  useEffect(() => setChatRoomLoading(isLoading), [isLoading]);

  return (
    <Wrapper>
      {router.query.id ? (
        <>
          {isLoading ? (
            <LoadingBox />
          ) : (
            <>
              <StatusBar status={status} memo={memo?.student_memo} />

              <V.Column padding={{ horizontal: 20 }} gap={20}>
                <Txt size={16} weight="bold">
                  현재 {chat_users_count}명이 참여 중입니다
                </Txt>

                <V.Column
                  gap={16}
                  maxHeight={600}
                  scroll={{ type: "auto", bar: true }}
                >
                  {sortedChatUsers?.map((item: any) => (
                    <UserCard
                      name={item?.name}
                      avatar={item?.picture}
                      initiator={initiator?.id === item?.id}
                      detail={{
                        student: `${
                          item?.attending ? "재원생" : "퇴소생"
                        } ˙ ${useMoment(item?.birthday).format("yyyy.mm.dd")}
                ${item?.school_year} ˙ ${useMoment(item?.admission_date).format(
                  "yyyy.mm.dd"
                )} 입소 
                `,

                        teacher: `선생님 ${
                          item?.subject ? "˙ " + item?.subject : ""
                        }`,
                      }}
                      category={item?.category}
                      joinTime={item?.joinTime}
                    />
                  ))}
                </V.Column>
              </V.Column>
            </>
          )}
        </>
      ) : (
        <V.Column
          flex={1}
          align="center"
          crossAlign="center"
          padding={{ bottom: 40 }}
        >
          <Txt size={13} color="#aaa">
            채팅방을 선택 시 노출됩니다
          </Txt>
        </V.Column>
      )}
    </Wrapper>
  );
}

const Wrapper = ({ children }: { children: any }) => (
  <V.Column
    maxWidth={320}
    backgroundColor="#fff"
    flex={1}
    minHeight="100vh"
    maxHeight="100vh"
    scroll={{ type: "auto", bar: true }}
  >
    {children}
  </V.Column>
);

const LoadingBox = () => (
  <Wrapper>
    <V.Column
      flex={1}
      align="center"
      crossAlign="center"
      padding={{ bottom: 40 }}
      gap={15}
    >
      <LoadingSpinner size={40} />

      <Txt size={14} color="#999">
        채팅방 정보 가져오는 중 ...
      </Txt>
    </V.Column>
  </Wrapper>
);
