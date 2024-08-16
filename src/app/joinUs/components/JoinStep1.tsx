import React, { ChangeEvent, useEffect, useState } from "react";

//libs
import { BottomSheet, Button, CalenderModal, Input, V } from "@/_ui";
import { AvatarUploadBox } from "@/libs/components/_custom/AvatarUploadBox";

//atom
import { joinFieldAtom } from "@/app/joinUs/atoms/join-field-atom";
import { useRecoilState } from "recoil";

//hooks
import axios from "@/app/_layout/apis/axios";
import DaumPostcodeEmbed from "react-daum-postcode";
import useCloudiReader from "@/libs/hooks/useCloudiReader";
import { useMoment } from "@/libs/hooks";

//utils
import { regEx } from "@/libs/utils/regEx";

//
export default function JoinStep1({ onStepNext }: { onStepNext: () => void }) {
  const [isValues, setIsValues] = useRecoilState(joinFieldAtom);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [isEmailErr, setIsEmailErr] = useState<boolean | string>(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isPost, setIsPost] = useState({
    post: "",
    address: "",
  });

  //
  // 입력
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsValues({ ...isValues, [name]: value });
  };

  //
  // 이메일 중복확인 탭
  const handleEmailCheck = () => {
    if (!regEx.email.test(isValues.email)) {
      setIsEmailErr("이메일 형식으로 입력하세요.");
    } else {
      axios
        .post("/accounts/teacher/signup/email/verify/", {
          email: isValues.email,
        })
        .then((res) => {
          setIsEmailCheck(true);
          setIsEmailErr(false);
        })
        .catch((err) => {
          setIsEmailErr("이미 존재하는 이메일입니다.");
        });
    }
  };

  //
  /// 주소찾기 핸들러
  useEffect(() => {
    setIsValues({
      ...isValues,
      post: isPost.post,
      address: isPost.address,
    });
  }, [isPost.post, isPost.address, isValues.post, isValues.address]);

  //
  // 이미지 업로드
  const { status, uploadImageReader } = useCloudiReader({
    handleOnState: (imgUrl) => setIsValues({ ...isValues, profileImg: imgUrl }),
  });

  console.log();

  return (
    <>
      <V.Column align="center" gap={20}>
        <AvatarUploadBox
          size={120}
          source={isValues.profileImg}
          onCancel={() => setIsValues({ ...isValues, profileImg: "" })}
          onUpload={(result: any) => uploadImageReader(result)}
          loading={status === "loading"}
        />

        <Input label="이메일 (아이디)" important="*">
          <Input.TextField
            name="email"
            placeholder="이메일을 입력하세요"
            value={isValues.email}
            onChange={(e) => {
              if (isEmailCheck) return;
              else handleOnChange(e);
            }}
            tab={{
              name: "중복확인",
              disabled: isEmailCheck,
              onClick: () => handleEmailCheck(),
            }}
            error={{ error: !!isEmailErr, message: isEmailErr as string }}
          />
        </Input>

        <Input label="비밀번호" important="*">
          <Input.TextField
            type="password"
            name="password"
            placeholder="특수문자,영문, 숫자 조합 8이상 입력하세요"
            value={isValues.password}
            onChange={handleOnChange}
            error={{
              error:
                !!isValues.password && !regEx.password.test(isValues.password),
              message: "특수문자,영문,숫자 조합 8이상 입력하세요",
            }}
          />
        </Input>

        <Input label="비밀번호 확인" important="*">
          <Input.TextField
            type="password"
            name="password2"
            placeholder="비밀번호를 확인하세요"
            value={isValues.password2}
            onChange={handleOnChange}
            error={{
              error:
                !!isValues.password2 &&
                isValues.password !== isValues.password2,
              message: "비밀번호가 일치하지 않습니다",
            }}
          />
        </Input>

        <Input label="이름" important="*">
          <Input.TextField
            name="username"
            maxLength={5}
            placeholder="이름을 입력하세요"
            value={isValues.username}
            onChange={handleOnChange}
          />
        </Input>

        <Input label="연락처" important="*">
          <Input.PhoneNumberField
            placeholder="-를 제외하고 입력하세요"
            value={isValues.phoneNumber}
            onChange={(e) =>
              setIsValues({ ...isValues, phoneNumber: e.target.value })
            }
            error={{
              error:
                !!isValues.phoneNumber &&
                !regEx.phoneNumber.test(isValues.phoneNumber),
              message: '"010 시작으로 정확히 입력하세요',
            }}
          />
        </Input>

        <Input label="생년월일" important="*">
          <Input.Dummy
            value={
              !!isValues.birth
                ? useMoment(isValues.birth).format("yyyy.mm.dd")
                : ""
            }
            placeholder="생년월일을 선택하세요"
            onClick={() => setIsCalenderOpen(true)}
          />
        </Input>

        <Input label="우편번호" important="*">
          <Input.Dummy
            placeholder="우편번호를 찾으세요"
            value={isValues.post}
            onClick={() => setIsPostOpen(true)}
            tab={{ name: "우편번호 찾기", onClick: () => setIsPostOpen(true) }}
          />
        </Input>

        <Input label="주소" important="*">
          <Input.Dummy
            placeholder="우편번호를 통해 주소를 검색하세요"
            value={isValues.address}
          />
        </Input>

        <Input label="상세주소" important="*">
          <Input.TextField
            name="address2"
            placeholder="상세주소를 입력하세요"
            value={isValues.address2}
            onChange={handleOnChange}
          />
        </Input>
      </V.Column>

      <Button
        type="button"
        width="100%"
        disabled={
          !(
            isValues.email &&
            isValues.username &&
            isValues.birth &&
            isValues.post &&
            isValues.address &&
            isValues.address2
          ) ||
          !isEmailCheck ||
          !regEx.password.test(isValues.password) ||
          isValues.password !== isValues.password2 ||
          (!!isValues.phoneNumber && !isValues.phoneNumber.startsWith("010"))
        }
        onClick={onStepNext}
      >
        다음으로
      </Button>

      {/* 주소 검색 모달 */}
      <BottomSheet open={isPostOpen} onCancel={() => setIsPostOpen(false)}>
        <DaumPostcodeEmbed
          css={{ width: "100%" }}
          onComplete={(data: any) => {
            setIsPostOpen(false);
            setIsPost({
              ...isPost,
              post: data.zonecode,
              address: data.address,
            });
          }}
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
        />
      </BottomSheet>

      {/* 생년월일 선택 모달 */}
      <CalenderModal
        open={isCalenderOpen}
        onCancel={() => setIsCalenderOpen(false)}
        date={isValues.birth as any}
        onClick={(date: any) => {
          setIsValues({ ...isValues, birth: date });
          setIsCalenderOpen(false);
        }}
      />
    </>
  );
}
