import { atom } from "recoil";

// 현재 사용자 정보
export const userProfileAtom = atom<any>({
  key: "user-profile-data",
  default: {
    status: "faild",
    id: null,
    category: null,
    bedge: { alarm: false, alarm_count: 0, chat: false, chat_count: 0 },
    email: null,
    picture: null,
    username: null,
  },
});
