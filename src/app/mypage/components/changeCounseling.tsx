import React, { useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//libs
import { Button, Select, Txt, V } from "@/_ui";
import { colors } from "@/libs/themes/colors";

//apis
import { updatedMyConsult } from "@/app/mypage/apis/updatedMyConsult";
import { getAllMyConsults } from "@/app/mypage/apis/getAllMyConsults";

//atoms
import { useSetRecoilState } from "recoil";
import { alartAtom } from "@/app/_layout/atoms/widgets-atom";

//
export default function ChangeCounseling({
  profileData,
}: {
  profileData: any;
}) {
  const { axiosInstance, status } = useCore();
  const { queryClient, useQuery, useMutation } = useTanstackQuery();
  const setIsAlart = useSetRecoilState(alartAtom);

  const [korlang, setKorlang] = useState("");
  const [math, setMath] = useState("");
  const [eng, setEng] = useState("");

  const 주기key = "mypage-consulting-ket";

  //
  /// 나의 주기 가져오기
  const { data } = useQuery(
    [주기key, profileData?.User?.id, profileData?.status],
    () => getAllMyConsults({ axiosInstance, id: profileData?.User?.id }),
    {
      onSuccess: (data) => {
        setKorlang(data?.kor_consul);
        setMath(data?.math_consul);
        setEng(data?.eng_consul);
      },

      enabled: !!profileData?.User?.id,
    }
  );

  //
  /// 주기 수정
  const { mutate: onUpdate, isLoading } = useMutation(
    () =>
      updatedMyConsult({
        axiosInstance,
        id: profileData?.User?.id,
        kor_consul: korlang,
        math_consul: math,
        eng_consul: eng,
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([주기key]);
        setIsAlart(true);
      },
    }
  );

  return (
    <>
      <V.Column padding={{ horizontal: 6 }}>
        <Txt as="strong">희망 상담주기</Txt>
        <Txt size={14} color={colors.grey600} margin={{ top: 5 }}>
          {
            "상담주기는 인트라넷을 통해서 언제든지 변경이 가능하며,\n주기에 맞춰 과목별 선생님이 직접 호출해요\n잘못된 정보가 있다면 문의하기를 통해서 수정 요청하세요"
          }
        </Txt>

        <V.Column gap={20} margin={{ top: 26 }}>
          <Select
            label="국어 상담주기"
            important="*"
            value={korlang}
            onChange={(e) => setKorlang(e.target.value)}
            options={choice}
            renderItem={(item) => (
              <Select.Option key={item.value} value={item.value}>
                {item?.name}
              </Select.Option>
            )}
          />

          <Select
            label="수학 상담주기"
            important="*"
            value={math}
            onChange={(e) => setMath(e.target.value)}
            options={choice}
            renderItem={(item) => (
              <Select.Option key={item.value} value={item.value}>
                {item?.name}
              </Select.Option>
            )}
          />

          <Select
            label="영어 상담주기"
            important="*"
            value={eng}
            onChange={(e) => setEng(e.target.value)}
            options={choice}
            renderItem={(item) => (
              <Select.Option key={item.value} value={item.value}>
                {item?.name}
              </Select.Option>
            )}
          />

          <Button type="button" width="100%" onClick={() => onUpdate()}>
            {isLoading ? "주기 업데이트 중 ..." : "상담 주기 변경"}
          </Button>
        </V.Column>
      </V.Column>
    </>
  );
}

// 주기
const choice = [
  { value: "0", name: "제가 필요할 때 찾아갈게요" },
  { value: "7", name: "일주일에 한번" },
  { value: "14", name: "2주에 한번" },
  { value: "30", name: "한달에 한번" },
];
