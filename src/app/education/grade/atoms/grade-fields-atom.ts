import { atom } from "recoil";

// 성적추가
export const gradeFieldsAtom = atom({
  key: "student-grade-field",
  default: {
    exam: "",
    korean: "",
    english: "",
    math: "",
    research1: "",
    research2: "",
    history: "",
    foreign: "",
    research1_subject: "",
    research2_subject: "",
    korean_score: "",
    english_score: "",
    math_score: "",
    research1_score: "",
    research2_score: "",
    history_score: "",
    foreign_score: "",
    korean_wrong: "",
    english_wrong: "",
    math_wrong: "",
    research1_wrong: "",
    research2_wrong: "",
    history_wrong: "",
    foreign_wrong: "",
  },
});
