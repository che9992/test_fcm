import React, { useState } from "react";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { useAxios } from "@/app/_layout/apis/_config";

//apis
import { updatedMyAlarm } from "@/app/mypage/apis/updatedMyAlarm";
import { getAllMyAlarms } from "@/app/mypage/apis/getAllMyAlarms";

//libs
import {
  Button,
  Checkbox,
  Select,
  Spacing,
  Switch,
  Txt,
  TxtSpan,
  V,
} from "@/_ui";
import { colors } from "@/libs/themes";

//atoms
import { alartAtom } from "@/app/_layout/atoms/widgets-atom";
import { useSetRecoilState } from "recoil";

//compnents
import MyPushBox from "./myPushBox";

//
export default function MyAlarm() {
  const queryKey = "my-page-alarms-values-key";
  const axiosInstance = useAxios();
  const setIsAlart = useSetRecoilState(alartAtom);
  const { useQuery, useMutation } = useTanstackQuery();

  const [activePush, setActivePush] = useState(false);
  const [category, setCategory] = useState<any>({
    메세지: false,
    학사일정: false,
    공지사항: false,
    식단표: false,
    콘텐츠: false,
  });

  const [week, setWeek] = useState<any>({
    월: false,
    화: false,
    수: false,
    목: false,
    금: false,
    토: false,
    일: false,
  });

  const [time, setTime] = useState({
    time_start: "",
    time_end: "",
    time_all_day: false,
  });

  const [timeErr, setTimeErr] = useState<string | boolean>(false);

  //
  // 가져오기
  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getAllMyAlarms({ axiosInstance }),
    onSuccess: (data) => {
      const newCategory = Object.entries(data?.pages || {}).reduce(
        (acc: any, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {}
      ); // 배열 순회 후 모든 객체를 합치거나 값을 합산할떄

      const newWeeks = Object.entries(data?.days || {}).reduce(
        (acc: any, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {}
      );

      setActivePush(data?.enabled);
      setCategory(newCategory);
      setWeek(newWeeks);

      setTime({
        time_start: data?.time_start,
        time_end: data?.time_end,
        time_all_day: data?.time_all_day,
      });
    },
  });

  //
  // 데이터 업데이트
  const { mutate: onUpdateAlarm } = useMutation({
    mutationFn: () =>
      updatedMyAlarm({
        axiosInstance,
        body: {
          pages: category,
          days: week,
          time_start: time?.time_start,
          time_end: time.time_end,
          time_all_day: time?.time_all_day,
          enabled: activePush,
        },
      }),
    onSuccess: (data) => {
      console.log("알람업데이트", data);
      setTimeErr(false);
      setIsAlart(true);
    },
    onError: (err) => setTimeErr(true),
  });

  return (
    <>
      <V.Column padding={{ horizontal: 6 }}>
        <Txt as="strong">알림 설정</Txt>

        <V.Column margin={{ top: 10 }}>
          <Txt size={14} color={colors.grey800} lineHeight={1.65}>
            알람 권한이 허락되어야 원활한 서비스를 제공받을 수 있습니다
          </Txt>
        </V.Column>

        <Spacing size={22} />

        <V.Row align="center" gap={18}>
          <TxtSpan color="#888">푸시 알림 설정</TxtSpan>

          <Switch
            onClick={() => setActivePush(!activePush)}
            active={activePush}
          />
        </V.Row>

        <Spacing size={20} />

        <V.Column gap={4}>
          <TxtSpan color="#888">알림 설정</TxtSpan>
          <V.Row gap={8} css={{ flexWrap: "wrap" }}>
            {Object.entries(category).map(([key, value]) => (
              <Checkbox
                key={key}
                checked={value as boolean} // Add type assertion here
                disabled={!activePush}
                label={{ title: key }}
                name={key}
                id={key}
                onChange={(e) => {
                  const { checked } = e.target ?? {};
                  setCategory((prev: any) => ({ ...prev, [key]: checked }));
                }}
              />
            ))}
          </V.Row>
        </V.Column>

        <Spacing size={20} />

        <V.Column gap={4}>
          <TxtSpan color="#888">요일</TxtSpan>
          <V.Row gap={8} css={{ flexWrap: "wrap" }}>
            {Object.entries(week).map(([key, value]) => (
              <Checkbox
                key={key}
                checked={value as boolean}
                disabled={!activePush}
                label={{ title: key }}
                name={key}
                id={key}
                onChange={(e) => {
                  const { checked } = e.target ?? {};
                  setWeek((prev: any) => ({ ...prev, [key]: checked }));
                }}
              />
            ))}
          </V.Row>
        </V.Column>

        <Spacing size={16} />
        {/* ------- 시간 ------- */}

        <V.Column gap={4}>
          <TxtSpan color="#888">시간</TxtSpan>

          <V.Row gap={20} align="center">
            <V.Row gap={10} css={{ width: "auto" }} align="center">
              <V.Column minWidth={100} maxWidth={100}>
                <Select
                  disabled={time?.time_all_day || !activePush}
                  value={time?.time_start}
                  onChange={(e) =>
                    setTime({ ...time, time_start: e.target.value })
                  }
                  options={timePicker}
                  renderItem={(item) => (
                    <Select.Option key={item}>{item}</Select.Option>
                  )}
                />
              </V.Column>

              <TxtSpan>~</TxtSpan>

              <V.Column minWidth={100} maxWidth={100}>
                <Select
                  disabled={time?.time_all_day || !activePush}
                  value={time?.time_end}
                  onChange={(e) =>
                    setTime({ ...time, time_end: e.target.value })
                  }
                  options={timePicker}
                  renderItem={(item) => (
                    <Select.Option key={item}>{item}</Select.Option>
                  )}
                />
              </V.Column>
            </V.Row>

            <Checkbox
              disabled={!activePush}
              label={{ title: "24시간" }}
              name="24"
              id="24"
              checked={time?.time_all_day}
              onChange={(e) =>
                setTime({ ...time, time_all_day: !time?.time_all_day })
              }
            />
          </V.Row>
        </V.Column>

        {/* ------- 버튼 ------- */}

        {timeErr && (
          <TxtSpan color={colors.red} size={12} padding={{ top: 10 }}>
            ⛔ 시작 시간이 종료 시간보다 같거나 느릴 수 없습니다.
          </TxtSpan>
        )}

        <Spacing size={16} />

        {/* 푸시알림 권한 박스 */}
        <MyPushBox />

        <Button
          width="100%"
          margin={{ top: 10 }}
          type="button"
          onClick={() => onUpdateAlarm()}
        >
          알람 설정완료
        </Button>
      </V.Column>
    </>
  );
}

const timePicker = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "23:59",
];
