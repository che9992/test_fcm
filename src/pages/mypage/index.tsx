import { useTanstackQuery, useLocalStorage } from "@/libs/hooks";
import { useCore } from "@/libs/provider/useCore";
import { storage_keys } from "@/libs/utils/storage_keys";

//apis
import { updatedLogout } from "@/app/mypage/apis/updatedLogout";
import { getMyProfile } from "@/app/mypage/apis/getMyProfile";

//libs
import { colors } from "@/libs/themes";
import { Avatar, Divider, Txt, TxtSpan, TxtTab, V } from "@/_ui";

//utils
import { useMoment } from "@/libs/hooks";
import { signOut, useSession } from "next-auth/react";

//components
import View from "@/app/_layout/components/View";
import MyAlarm from "@/app/mypage/components/myAlarm";
import ChangeCounseling from "@/app/mypage/components/changeCounseling";
import ChangePassword from "@/app/mypage/components/changePassword";

//
export default function Mypage() {
  const { axiosInstance, router, status } = useCore();
  const { data: session } = useSession();
  const { useQuery, useMutation, queryClient } = useTanstackQuery();
  const fcm_token = useLocalStorage(storage_keys.fcm_token).get();

  const { data: profileData, isLoading } = useQuery(
    ["profile-my-page-key"],
    () => getMyProfile({ axiosInstance }),
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      enabled: status === "authenticated",
    }
  );

  const info = profileData?.student_info;
  const profile = profileData?.User;

  const profileItems = [
    {
      title: "학생정보",
      datas: [
        { key: "학년도", value: info?.school_year?.title },
        {
          key: "생년월일",
          value: useMoment(info?.birthday).format("yyyy.mm.dd"),
        },
        { key: "출신학교", value: info?.origin_school },
      ],
    },
    {
      title: "교육정보",
      datas: [
        { key: "국어", value: info?.korean_type },
        { key: "수학", value: info?.math_type },
        { key: "탐구1", value: info?.research1_subject },
        { key: "탐구2", value: info?.research2_subject },
      ],
    },
    {
      title: "개인정보",
      datas: [
        { key: "연락처", value: profile?.phone_number },
        {
          key: "입소일",
          value: useMoment(info?.admission_date).format("yyyy.mm.dd"),
        },
        {
          key: "주소",
          value: `(${info?.zip_code})\t${info?.address}\t${info?.detailed_address}`,
        },
      ],
    },
    {
      title: "보호자 정보",
      datas: [
        {
          key: "아버지",
          value: `${info?.father_name ? info?.father_name : "-"}\t${
            info?.father_mobile ? info?.father_mobile : "-"
          }`,
        },
        {
          key: "어머니",
          value: `${info?.mother_name ? info?.mother_name : "-"}\t${
            info?.mother_mobile ? info?.mother_mobile : "-"
          }`,
        },
      ],
    },
  ];

  //
  /// 로그아웃
  const { mutate: onLogout } = useMutation({
    mutationFn: () =>
      updatedLogout({
        axiosInstance,
        refresh_token: session?.refreshToken as any,
        fcm_token,
      }),
    onSuccess: () => {
      queryClient.clear();
      // useLocalStorage(storage_keys.fcm_token).remove();
      signOut({ redirect: true, callbackUrl: "/sign/login" });
    },
  });

  return (
    <View
      navigator={false}
      loading={isLoading}
      appTitle={profileData?.User?.username}
      backEvent={() => router.back()}
    >
      <V.Column
        maxWidth={580}
        align="center"
        padding={{ top: 20, bottom: 40, horizontal: 16 }}
      >
        <V.Column align="center">
          <Avatar
            source={profileData?.student_info?.picture}
            alt={profileData?.User?.username}
            size={100}
          />
          <Txt as="strong" padding={{ top: 10, bottom: 3 }}>
            {profileData?.User?.username}
          </Txt>
          <TxtSpan>
            {profileData?.User?.email ? profileData?.User?.email : "-"}
          </TxtSpan>
        </V.Column>

        <V.Column gap={10} margin={{ top: 30 }}>
          {profileItems?.map((item) => (
            <V.Column
              key={item.title}
              backgroundColor={colors.grey000}
              borderRadius={16}
              padding={{ vertical: 20, horizontal: 16 }}
              gap={16}
            >
              <Txt size={15} css={{ fontWeight: 600 }}>
                {item.title}
              </Txt>

              <V.Column gap={9}>
                {item?.datas?.map((item) => (
                  <V.Row
                    key={item?.key}
                    crossAlign="space-between"
                    align="start"
                  >
                    <TxtSpan size={14}>{item?.key}</TxtSpan>
                    <Txt
                      size={14}
                      weight="medium"
                      color={colors.grey900}
                      txtAlign="end"
                    >
                      {item?.value ? item?.value : "-"}
                    </Txt>
                  </V.Row>
                ))}
              </V.Column>
            </V.Column>
          ))}
        </V.Column>

        <V.Column align="end" margin={{ top: 20 }} padding={{ horizontal: 6 }}>
          <TxtTab
            color={colors.grey500}
            size={14}
            css={{ textDecoration: "underline" }}
            onClick={() => onLogout()}
          >
            로그아웃
          </TxtTab>
        </V.Column>

        <Divider size={1} color="#eee" spacing={{ vertical: 40 }} />

        {/* 알람 */}
        <MyAlarm />

        <Divider size={1} color="#eee" spacing={{ vertical: 40 }} />

        {/* 희망 상담주기 */}
        <ChangeCounseling profileData={profileData} />

        <Divider size={1} color="#eee" spacing={{ vertical: 40 }} />

        {/* 비밀번호 변경 */}
        <ChangePassword />
      </V.Column>
    </View>
  );
}

Mypage.auth = true;
