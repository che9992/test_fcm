import { useRouter } from "next/router";

// libes
import { TouchableOpacity, Txt, TxtSpan, V, P, AppDrawer } from "@/_ui";
import { CancelIcon } from "@/libs/assets/icon-fill";
import { colors, MQ } from "@/libs/themes";

//atoms
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chatRoom_detail_atom,
  chatRoom_detail_loading_atom,
  chatRoomDetailOpenAtom,
} from "@/app/chat/atoms/chat-atoms";

//components
import ChatDetail from "../_index/ChatDetail";

//
export default function RoomAppBar() {
  const router = useRouter();
  const [openDetail, setOpenDetail] = useRecoilState(chatRoomDetailOpenAtom);
  const data = useRecoilValue<any>(chatRoom_detail_atom);
  const loading = useRecoilValue(chatRoom_detail_loading_atom);

  const { group_chat, chat_users, exist } = data ?? {};

  // 앱바
  const appBarTitle = () => {
    const oppositeUser = chat_users?.[1];
    const { name, category } = oppositeUser ?? {};

    if (exist?.teacher) return group_chat ? "단체 채팅" : name + " " + category;
    else return data?.category + " 선생님 미배치";
  };

  return (
    <>
      <V.Column width="100%" zIndex={100}>
        <V.Row
          minHeight={60}
          align="center"
          crossAlign="center"
          border={{ position: "bottom", solid: 1, color: "#eee" }}
          zIndex={100}
        >
          <TouchableOpacity
            onClick={() => {
              if (router.pathname.includes("[id]")) router.back();
              else router.push({ query: { ...router.query, id: "" } });
            }}
            css={{ position: "absolute", left: 20 }}
          >
            <CancelIcon fill="#c5c5c5" size={22} />
          </TouchableOpacity>

          <Txt size={18} weight="bold">
            {!loading ? appBarTitle() : "로딩중 .."}
          </Txt>

          <TouchableOpacity
            onClick={() => setOpenDetail(true)}
            css={{ position: "absolute", right: 20 }}
          >
            <Txt size={14} color={colors.keyColor}>
              방정보
            </Txt>
          </TouchableOpacity>
        </V.Row>

        {!loading && !!data?.memo?.student_memo && (
          <V.Row padding={{ top: 5, horizontal: 10 }} zIndex={100}>
            <V.Row
              backgroundColor="#f8f8f8"
              borderRadius={12}
              padding={{ left: 14, right: 8, vertical: 5 }}
              align="center"
              crossAlign="space-between"
              gap={16}
              css={{ display: "none", [MQ[2]]: { display: "flex" } }}
            >
              <Txt
                size={14}
                color="#555"
                ellipsis={{ ellipsis: true, line: 1 }}
              >
                💡 {data?.memo?.student_memo}
              </Txt>

              <TxtSpan onClick={() => setOpenDetail(true)} padding={{ all: 5 }}>
                자세히
              </TxtSpan>
            </V.Row>
          </V.Row>
        )}
      </V.Column>

      <AppDrawer open={openDetail} onCancel={() => setOpenDetail(false)}>
        <ChatDetail />
      </AppDrawer>
    </>
  );
}
