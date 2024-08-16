import { Avatar, Txt, V } from "@/_ui";
import { useMoment } from "@/libs/hooks";
import { colors } from "@/libs/themes";
import React from "react";

type Types = {
  avatar: string;
  name: string;
  initiator?: boolean;
  category: "학생" | "선생님" | "학부모";
  detail?: {
    student?: string;
    teacher?: string;
    parent?: string;
  };
  joinTime?: any;
};

export default function UserCard({
  avatar,
  name,
  initiator,
  category,
  detail,
  joinTime,
}: Types) {
  const txt_themes = {
    size: 13,
    color: "#797979",
    lineHeight: 1.5,
    className: "user_categories",
  };

  return (
    <V.Row gap={10}>
      <V.Column width="auto" padding={{ top: 2 }}>
        <Avatar
          source={avatar ?? "/images/logo-384.png"}
          alt={name}
          size={36}
          borderRadius={100}
        />
      </V.Column>

      <V.Column>
        <V.Row align="center" gap={6} padding={{ bottom: 3 }}>
          <Txt weight="medium">{name}</Txt>
          {initiator && <Icon />}
        </V.Row>

        {category === "학생" && <Txt {...txt_themes}>{detail?.student}</Txt>}

        {category === "선생님" && (
          <Txt {...txt_themes} color={colors.keyColor}>
            {detail?.teacher}
          </Txt>
        )}

        {category === "학부모" && <Txt {...txt_themes}>{detail?.parent}</Txt>}

        {!!joinTime && (
          <Txt size={12} color="#aaa" padding={{ top: 4 }}>
            {useMoment(joinTime).detailMoment()} 참여
          </Txt>
        )}
      </V.Column>
    </V.Row>
  );
}

const Icon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.24131 9.17757C0.975176 7.44769 0.709045 5.71786 0.442913 3.98799C0.383895 3.60452 0.820213 3.34298 1.13058 3.57578C1.95973 4.19764 2.78883 4.81946 3.61798 5.44132C3.89098 5.64607 4.27992 5.57944 4.46918 5.2955L6.54 2.18925C6.75884 1.86099 7.24114 1.86099 7.45998 2.18925L9.5308 5.2955C9.72006 5.57944 10.109 5.64602 10.382 5.44132C11.2111 4.81946 12.0403 4.19764 12.8694 3.57578C13.1798 3.34298 13.6161 3.60452 13.5571 3.98799C13.291 5.71786 13.0248 7.44769 12.7587 9.17757H1.24131Z"
      fill="#FFB743"
    />
    <path
      d="M12.1582 12.0569H1.8418C1.51018 12.0569 1.24133 11.788 1.24133 11.4564V10.1374H12.7587V11.4564C12.7587 11.788 12.4899 12.0569 12.1582 12.0569Z"
      fill="#FFB743"
    />
  </svg>
);
