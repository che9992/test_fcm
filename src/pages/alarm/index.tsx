import { useTanstackQuery, useMoment, useRef, useState } from "@/libs/hooks";
import { useCore } from "@/libs/provider/useCore";

//apis
import { getAllAlarms } from "@/app/alarm/apis/getAllAlarms";
import { updatedReadAlarm } from "@/app/alarm/apis/updatedReadAlarm";
import { updatedAllReadAlarm } from "@/app/alarm/apis/updatedAllReadAlarm";

//libs
import { FlatList, Spacing, TouchableOpacity, Txt, TxtSpan, V } from "@/_ui";
import { colors } from "@/libs/themes";
import { SettingIcon } from "@/libs/assets/icon-fill";

//components
import View from "@/app/_layout/components/View";

//atoms
import { useRecoilState } from "recoil";
import { userProfileAtom } from "@/app/_layout/atoms/verify-atom";

//
export default function Index() {
  const refs = useRef(null);
  const { axiosInstance, router } = useCore();
  const {
    queryClient,

    useInfiniteQuery,
    useMutation,
    useInfiniteQueryObserver,
    queryKey,
  } = useTanstackQuery();

  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  const [alarms, setAlarms] = useState<any>([]);
  const [alarmCount, setAlarmCount] = useState(0);

  //
  // 알람 데이터
  const { data, fetchNextPage, isLoading } = useInfiniteQuery(
    [queryKey.알람],
    async ({ pageParam = 0 }) =>
      getAllAlarms({
        axiosInstance,
        pageToken: pageParam,
      }),
    {
      onSuccess: (data) => {
        const unreadCounts = data?.pages.map((el) => el.unread_count);
        const firstUnreadCount = unreadCounts[0];
        setAlarmCount(firstUnreadCount);
        setAlarms(data?.pages.map((page) => page.notifications).flat());
      },
      getNextPageParam: (lastPage) => {
        const { nextPageToken } = lastPage;
        if (nextPageToken !== -1) return nextPageToken;
        else return undefined;
      },
      staleTime: 0,
      cacheTime: 0,
    }
  );

  useInfiniteQueryObserver({ data, ref: refs, fetchNextPage });

  //
  // 성공 핸들러
  const onSuccess = (data?: any) => {
    queryClient.invalidateQueries([queryKey.알람]);
    queryClient.invalidateQueries([queryKey.사용자전역]);
    if (alarmCount <= 1)
      setUserProfile({
        ...userProfile,
        bedge: { ...userProfile.bedge, alarm: false, alarm_count: 0 },
      });
  };

  //
  // 특정 알람 읽음
  const { mutate: onUpdateRead } = useMutation({
    mutationFn: (id: any) => updatedReadAlarm({ axiosInstance, id }),
    onSuccess: (data) => {
      onSuccess();
      router.push(data?.url);
    },
  });

  //
  // 모든 알람 읽음
  const { mutate: onUpdateAllRead, isLoading: allRead_loading } = useMutation({
    mutationFn: (id: any) => updatedAllReadAlarm({ axiosInstance }),
    onSuccess: (data) => onSuccess(),
  });

  return (
    <View
      appTitle="알림"
      loading={isLoading}
      backEvent={() => router.back()}
      backgroundColor="#f8f9fc"
      navigator={false}
      borderBottom="1px solid #eee"
    >
      <V.Column
        maxWidth={500}
        backgroundColor="#fff"
        flex={1}
        padding={{ vertical: 30, horizontal: 20 }}
      >
        <V.Row crossAlign="space-between" align="start">
          <Txt as="b" size={18}>
            읽지 않은 알람은 <br />
            {alarmCount}개 입니다
          </Txt>

          <V.Row align="center" gap={12} width="auto">
            {alarmCount > 0 && (
              <TouchableOpacity
                margin={{ top: 4 }}
                txtSize={13}
                padding={{ vertical: 8, horizontal: 10 }}
                backgroundColor={colors.keyColor}
                borderRadius={100}
                txtColor="#fff"
                onClick={onUpdateAllRead}
                disabled={allRead_loading}
              >
                {allRead_loading ? "처리중 .." : "전부 읽음"}
              </TouchableOpacity>
            )}

            <TouchableOpacity
              backgroundColor="#f7f7f7"
              padding={{ all: 6 }}
              borderRadius={10}
              margin={{ top: 2 }}
              onClick={() => router.push("/mypage")}
            >
              <SettingIcon />
            </TouchableOpacity>
          </V.Row>
        </V.Row>

        <Spacing size={20} />

        <V.Column>
          <FlatList
            data={alarms}
            itemGap={10}
            keyExtractor={(el) => el?.id}
            renderItem={(item) => (
              <TouchableOpacity
                width="100%"
                padding={{ horizontal: 15, vertical: 14 }}
                backgroundColor={!item?.read ? "#f8f9fc" : "#fff"}
                border={{ solid: 1, color: !item?.read ? "#fff" : "#e5e5e5" }}
                borderRadius={14}
                onClick={() => {
                  if (!item?.read) {
                    onSuccess();
                    router.push(item?.url);
                  } else router.push(item?.url);
                }}
              >
                <V.Column gap={4}>
                  <Txt size={12} color={colors.keyColor} weight="medium">
                    {"#" + item?.category}
                  </Txt>
                  <Txt size={14} padding={{ bottom: 2 }}>
                    {item?.title}
                  </Txt>
                  <TxtSpan size={11} color="#aaa">
                    {useMoment(item?.created_at).fromNow()}
                  </TxtSpan>
                </V.Column>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              alarms.length > 9 && ((<div ref={refs}></div>) as any)
            }
          />
        </V.Column>
      </V.Column>
    </View>
  );
}

Index.auth = true;
