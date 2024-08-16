import React from "react";

//atom
import { joinFieldAtom } from "@/app/joinUs/atoms/join-field-atom";
import { useRecoilState } from "recoil";

//hook
import { useRouteOnload } from "@/libs/hooks/useRouteOnload";

//
export default function JoinLogic() {
  const [isValues, setIsValues] = useRecoilState(joinFieldAtom);

  useRouteOnload(() =>
    setIsValues({
      ...isValues,
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
    })
  );
}
