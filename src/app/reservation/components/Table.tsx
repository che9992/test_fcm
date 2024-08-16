import { Spacing, TouchableOpacity, Txt, TxtSpan, V, FlatList } from "@/_ui";
import { colors } from "@/libs/themes/colors";
import NoneResultBox from "../../../libs/components/_custom/NoneResultBox";

export default function Table({
  data,
  onReservate,
  onCancel,
}: {
  data: any;
  onReservate: any;
  onCancel: any;
}) {
  return (
    <FlatList
      data={data?.results}
      keyExtractor={(item) => item?.id}
      ListEmptyComponent={
        <NoneResultBox description=" 해당 날짜에 예약이 존재하지 않습니다" />
      }
      ListHeaderComponent={<Spacing size={20} />}
      renderItem={(item) => (
        <V.Column
          padding={{ all: 16 }}
          borderRadius={16}
          border={{ solid: 1, color: "#e2e2e2" }}
        >
          <V.Row crossAlign="space-between" align="center">
            <V.Row gap={16} align="center">
              <V.Column width="auto">
                <TxtSpan size={12} color="#999">
                  사용 시작
                </TxtSpan>

                <Txt size={16} weight="medium">
                  {item.start_time}
                </Txt>
              </V.Column>

              <Angel />

              <V.Column width="auto">
                <TxtSpan size={12} color="#999">
                  사용 종료
                </TxtSpan>
                <Txt size={16} weight="medium">
                  {item.end_time}
                </Txt>
              </V.Column>
            </V.Row>

            <V.Row width="auto" gap={4}>
              {!!data?.available && (
                <>
                  {!item.is_mine && !item.is_close && (
                    <TouchableOpacity
                      padding={{ vertical: 10, horizontal: 12 }}
                      borderRadius={14}
                      txtColor="#fff"
                      backgroundColor={colors.keyColor}
                      onClick={() => onReservate(item.id)}
                    >
                      예약하기
                    </TouchableOpacity>
                  )}
                </>
              )}

              {!!item.is_mine && !item?.is_close && (
                <TouchableOpacity
                  padding={{ vertical: 10, horizontal: 12 }}
                  borderRadius={14}
                  txtColor="#fff"
                  backgroundColor={colors.red}
                  onClick={() => onCancel(item.my_res_id)}
                >
                  예약취소
                </TouchableOpacity>
              )}

              {item.is_close && (
                <TouchableOpacity
                  as="button"
                  padding={{ vertical: 10, horizontal: 12 }}
                  borderRadius={14}
                  txtColor="#fff"
                  disabled
                >
                  마감
                </TouchableOpacity>
              )}
            </V.Row>
          </V.Row>

          <Spacing size={10} />

          <Txt size={13} color="#999">
            현재 신청자 : {item.user_count}명
          </Txt>
        </V.Column>
      )}
    />
  );
}

const Angel = () => (
  <div
    css={{
      width: "0px",
      height: "0px",
      borderLeft: "9px solid #ccc",
      borderTop: "5px solid transparent",
      borderBottom: "5px solid transparent",
    }}
  />
);
