import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { Avatar, TouchableOpacity, Txt, TxtSpan, V } from "@/_ui";
import { useMoment } from "@/libs/hooks";
import { colors, MQ } from "@/libs/themes";

type Types = {
  roomId: string | number;
  avatar?: string;
  name: string;
  category?: "학생" | "선생님" | "학부모";
  group?: boolean;
  userCount: number;
  latedstMessage: string;
  bedge?: boolean;
  bedgeCount: number;
  created_at?: string | Date;
};

//
export default function ChatRoomCard({
  roomId,
  avatar,
  name,
  category,
  group,
  userCount,
  latedstMessage,
  bedge,
  bedgeCount,
  created_at,
}: Types) {
  const router = useRouter();

  const TabWrap = ({ children }: { children: ReactNode }) => {
    return (
      <>
        <TouchableOpacity
          width="100%"
          css={{ [MQ[1]]: { display: "none" } }}
          backgroundColor={
            Number(router.query.id) === roomId ? "#f8f9fc" : "#fff"
          }
          onClick={() =>
            router.push({ query: { ...router.query, id: roomId } })
          }
        >
          {children}
        </TouchableOpacity>

        <TouchableOpacity
          width="100%"
          css={{ display: "none", [MQ[1]]: { display: "flex" } }}
          onClick={() => router.push(`chat/${roomId}`)}
        >
          {children}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <TabWrap>
      <V.Row
        padding={{ horizontal: 20, vertical: 13 }}
        align="start"
        crossAlign="space-between"
        gap={20}
      >
        <V.Row gap={10}>
          <Avatar
            source={avatar ?? "/images/logo-384.png"}
            alt={name}
            size={40}
            borderRadius={100}
          />
          <V.Column gap={1}>
            <Txt weight="medium" size={14}>
              {name} {category} {group && "외 " + (userCount - 2) + "명"}
            </Txt>
            <Txt size={13} color="#888" ellipsis={{ ellipsis: true, line: 1 }}>
              {latedstMessage}
            </Txt>
          </V.Column>
        </V.Row>

        <V.Column width="auto" align="end" gap={3}>
          <TxtSpan size={11} color="#aaa">
            {useMoment(created_at as Date).fromNow()}
          </TxtSpan>
          {bedge && (
            <V.Container
              minHeight={20}
              maxHeight={20}
              minWidth={20}
              maxWidth={20}
              backgroundColor={colors.red}
              borderRadius={100}
              align="center"
              crossAlign="center"
            >
              <TxtSpan size={11} color="#fff">
                {bedgeCount > 99 ? "+99" : bedgeCount}
              </TxtSpan>
            </V.Container>
          )}
        </V.Column>
      </V.Row>
    </TabWrap>
  );
}
