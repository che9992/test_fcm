export const QUERY_KEY = {
  학습관리: {
    시험성적: "edu-grade-table-key",
    시험성적상세: "edu-grade-detail-key",
    커리큘럼: "edu-curri-table-key",
    커리큘럼상세: "edu-curri-detail-key",
    커리큘럼상세_메모: "edu-curri-detail-memos-key",
    상담: "edu-consoult-table-key",
    상담상세: "edu-consoult-detail-key",
  },

  휴가내역: "edu-vacations-key",
  공지사항: { 리스트: "notices-data-key", 상세: "notice-detail-key" },
  자료실: { 리스트: "libraries-data-key", 상세: "library-detail-key" },
  식단표: { 리스트: "diets-data-key", 상세: "diet-detail-key" },
  문의하기: { 리스트: "faqs-data-key", 상세: "faq-detail-key" },

  예약하기: {
    컴퓨터: "reservate-computar-keys",
    전화: "reservate-call-keys",
    운동: "reservate-gym-keys",
    심야자습: "reservate-study-keys",
    마이페이지: "reservate-mypage-keys",
  },

  콘텐츠: {
    리스트: "contents-list-data",
    상세: "contents-detail-data",
    구매내역: "contents-receipts-data",
  },

  사용자전역: "app-user-verify-key",

  알람: "edu-alarms-key",

  채팅: {
    리스트: "edu-chat-all-list-key",
    상세: "edu-chatRoom-detail-key",
    메시지: "edu-chatRoom-messages-key",
  },
} as const;
