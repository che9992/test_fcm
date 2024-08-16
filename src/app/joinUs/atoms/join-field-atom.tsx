import { atom } from "recoil";

export const joinFieldReset = {
  profileImg: "",
  email: "",
  password: "",
  password2: "",
  username: "",
  birth: "",
  phoneNumber: "",
  post: "",
  address: "",
  address2: "",

  fatherName: "",
  fatherTel: "",
  motherName: "",
  motherTel: "",
  schoolYear: "",
  shcoolName: "",

  exam: true,
  koelang: "",
  math: "",
  eng: "",
  exploration1: "",
  exploration2: "",

  korlangSubject: "",
  mathSubject: "",
  exploration1Subject: "",
  exploration2Subject: "",

  korlangCounsel: "",
  mathCounsel: "",
  engCounsel: "",
  starting: "",

  sendKorlang: "",
  sendMath: "",
  sendEng: "",
};

// 가입하기 > 필드
export const joinFieldAtom = atom({
  key: "join",
  default: joinFieldReset,
});
