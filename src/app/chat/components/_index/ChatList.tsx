import { useCore } from "@/libs/provider/useCore";
import { useSafeArea, useViewportHeight } from "@/libs/hooks";

//libs
import { Pagination, Spacing, TouchableOpacity, Txt, V } from "@/_ui";
import { colors, MQ } from "@/libs/themes";

//atoms
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "@/app/_layout/atoms/verify-atom";

//components
import ChatAppBar from "../chat-list/ChatAppBar";
import ChatRoomCard from "../card/ChatRoomCard";

//
export default function ChatList({
  data,
  dataLength,
}: {
  dataLength: number;
  data: any;
}) {
  const { router } = useCore();
  const { query } = router ?? {};
  const { page } = query;

  const userProfile = useRecoilValue(userProfileAtom);
  const { bottom: safeAreaB } = useSafeArea({ bottom: 20 });

  const viewportHeight: any = useViewportHeight();

  return (
    <V.Column
      backgroundColor="#fff"
      flex={1}
      maxWidth={340}
      minWidth={340}
      css={{
        height: viewportHeight + "px",
        [MQ[1]]: {
          maxWidth: "100%",
          minWidth: "100%",
        },
      }}
    >
      <ChatAppBar dataLength={dataLength} />

      <V.Column padding={{ horizontal: 25 }}>
        <TouchableOpacity
          width="100%"
          backgroundColor={colors.blueBg}
          padding={{ all: 10 }}
          borderRadius={14}
          onClick={() => router.push("/chat/create")}
        >
          +채팅방 만들기
        </TouchableOpacity>
      </V.Column>

      <Spacing size={15} />

      {data?.length === 0 ? (
        <V.Column align="center">
          <Txt size={14} color="#888">
            ⛔ 채팅이 존재하지 않습니다
          </Txt>
        </V.Column>
      ) : (
        <V.Column scroll={{ type: "auto", bar: true }}>
          {data?.map((item: any) => {
            const { teacher } = item?.exist ?? {};
            return (
              <V.Container key={item?.id}>
                <ChatRoomCard
                  roomId={item?.id}
                  name={
                    teacher
                      ? item?.chat_users[1]?.name
                      : item?.category + " 선생님 지정 대기 .."
                  }
                  category={teacher ? item?.chat_users[1]?.category : ""}
                  group={item?.group_chat}
                  userCount={item?.chat_users_count}
                  latedstMessage={
                    router.query.id === item?.id?.toString()
                      ? "채팅방에 입장 중..."
                      : item?.latest_message?.messageType === "파일"
                      ? "파일을 전송했습니다"
                      : item?.latest_message?.message
                  }
                  bedge={item.bedge[userProfile?.id]}
                  bedgeCount={item.bedgeCount[userProfile?.id]}
                  created_at={item?.created_at}
                />
              </V.Container>
            );
          })}
        </V.Column>
      )}

      <V.Column align="center" padding={{ top: 6, bottom: safeAreaB }}>
        <Pagination
          activePage={page ? Number(page) : 1}
          itemsCountPerPage={10}
          totalItemsCount={dataLength}
          pageRangeDisplayed={4}
          hideFirstLastPages={true}
          hideNavigation={true}
          onChange={(pageNumber) =>
            router.push({ query: { ...query, page: pageNumber } })
          }
        />
      </V.Column>
    </V.Column>
  );
}
