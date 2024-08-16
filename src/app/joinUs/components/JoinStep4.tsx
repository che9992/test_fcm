import React, { useState } from "react";

//libs
import { Button, Checkbox, Input, Txt, V } from "@/_ui";

//atom
import { joinFieldAtom } from "@/app/joinUs/atoms/join-field-atom";
import { useRecoilState } from "recoil";

//components
import JoinCheckModals from "./JoinCheckModals";

//
export default function JoinStep4() {
  const [isValues, setIsValues] = useRecoilState(joinFieldAtom);
  const [isCheck1, setIsCheck1] = useState(false);
  const [isCheck2, setIsCheck2] = useState(false);
  const [isCheck3, setIsCheck3] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean | 1 | 2 | 3>(false);

  return (
    <>
      <V.Column gap={50}>
        <V.Column gap={20}>
          <Input label="국어 선생님께">
            <Input.Textarea
              rows={3}
              placeholder="국어 선생님께 전달사항 입력 ..."
              value={isValues.sendKorlang}
              onChange={(e) =>
                setIsValues({ ...isValues, sendKorlang: e.target.value })
              }
            />
          </Input>

          <Input label="수학 선생님께">
            <Input.Textarea
              rows={3}
              placeholder="수학 선생님께 전달사항 입력 ..."
              value={isValues.sendMath}
              onChange={(e) =>
                setIsValues({ ...isValues, sendMath: e.target.value })
              }
            />
          </Input>

          <Input label="영어 선생님께">
            <Input.Textarea
              rows={3}
              placeholder="영어 선생님께 전달사항 입력 ..."
              value={isValues.sendEng}
              onChange={(e) =>
                setIsValues({ ...isValues, sendEng: e.target.value })
              }
            />
          </Input>
        </V.Column>

        <V.Column gap={10}>
          <Txt as="h3" size={18} margin={{ bottom: 14 }}>
            {"에듀셀파 인트라넷\n이용약관 및 서비스 안내 (필수)"}
          </Txt>

          <Checkbox
            label={{ title: "개인정보 수집 및 이용동의" }}
            id="개인정보 수집 및 이용동의"
            checked={isCheck1}
            onClick={() => setIsModalOpen(1)}
          />

          <Checkbox
            label={{ title: "학원 수칙 안내" }}
            id="학원 수칙 안내"
            checked={isCheck2}
            onClick={() => setIsModalOpen(2)}
          />

          <Checkbox
            label={{ title: "수강료 환불 안내" }}
            id="수강료 환불 안내"
            checked={isCheck3}
            onClick={() => setIsModalOpen(3)}
          />
        </V.Column>
      </V.Column>

      <Button
        type="submit"
        width="100%"
        disabled={
          (!(isValues.sendKorlang && isValues.sendMath && isValues.sendEng) &&
            !isCheck1) ||
          !isCheck2 ||
          !isCheck3
        }
      >
        가입하기
      </Button>

      <JoinCheckModals
        view={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onCheck={() => {
          if (isModalOpen === 1) setIsCheck1(true);

          if (isModalOpen === 2) setIsCheck2(true);

          if (isModalOpen === 3) setIsCheck3(true);
        }}
      />
    </>
  );
}
