import { atom } from "recoil";

// 채팅방 목록
export const chatRoom_list_atom = atom({
  key: "chatRoom_list_atom",
  default: [],
});

// 채팅방 정보
export const chatRoom_detail_atom = atom({
  key: "chatRoom-detail-data-atom",
  default: null,
});

// 채팅방 정보 > 로딩
export const chatRoom_detail_loading_atom = atom({
  key: "chatRoom-detail-loading-atom",
  default: false,
});

// 채팅방 정보 > 자세히 토글
export const chatRoomDetailOpenAtom = atom<boolean>({
  key: "chatRoom-detail-open-atom",
  default: false,
});

// 채팅방 > 메시지
export const chatRoom_message_atom = atom<any>({
  key: "chatRoom-message-atom",
  default: [],
});
