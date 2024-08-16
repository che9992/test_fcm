import React, { useState } from "react";
import { useRouter } from "next/router";

//libs
import { Input, TouchableOpacity, TxtSpan, V } from "@/_ui";
import { colors } from "@/libs/themes";

//
export default function ChatFilters() {
  const router = useRouter();
  const { status, group, read, search } = router.query;
  const [isSearch, setIsSearch] = useState(search ? search : "");

  return (
    <V.Column
      padding={{ horizontal: 20, bottom: 20 }}
      margin={{ bottom: 15 }}
      border={{ solid: 8, position: "bottom", color: "#f9f9f9" }}
    >
      <Input.TextField
        type="search"
        placeholder="검색어를 입력하세요"
        value={isSearch}
        onChange={(e) => setIsSearch(e.target.value)}
        themes={{
          default: { backgroundColor: "#fafafa" },
          focus: { backgroundColor: "#fafafa" },
        }}
        sizes={{ borderRadius: 100, maxHeight: 46 }}
        tab={{
          name: "검색",
          onClick: () =>
            router.push({
              query: { ...router.query, page: 1, search: isSearch },
            }),
        }}
      />

      <V.Row padding={{ top: 20 }} align="center" gap={20}>
        <TxtSpan>상태</TxtSpan>

        <V.Row gap={5} crossGap={3}>
          <FilterTab
            name="진행중"
            active={status === "진행중" || !status}
            payload={{ status: "진행중" }}
          />
          <FilterTab
            name="종료"
            active={status === "종료"}
            payload={{ status: "종료" }}
          />
        </V.Row>
      </V.Row>

      <V.Row padding={{ top: 8 }} align="center" gap={20}>
        <TxtSpan>그룹</TxtSpan>

        <V.Row gap={5} crossGap={3}>
          <FilterTab
            name="전체"
            active={group === "" || !group}
            payload={{ group: "" }}
          />
          <FilterTab
            name="1:1"
            active={group === "false"}
            payload={{ group: "false" }}
          />
          <FilterTab
            name="그룹"
            active={group === "true"}
            payload={{ group: "true" }}
          />
        </V.Row>
      </V.Row>

      <V.Row padding={{ top: 8 }} align="center" gap={20}>
        <TxtSpan>읽음</TxtSpan>

        <V.Row gap={5} crossGap={3}>
          <FilterTab
            name="전체"
            active={!read || read === null || read === undefined}
            payload={{ read: "" }}
          />
          <FilterTab
            name="확인"
            active={read === "true"}
            payload={{ read: true }}
          />
          <FilterTab
            name="미확인"
            active={read === "false"}
            payload={{ read: "false" }}
          />
        </V.Row>
      </V.Row>
    </V.Column>
  );
}

const FilterTab = ({
  name,
  active,
  payload,
}: {
  name: string;
  active: boolean;
  payload: any;
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      txtColor={active ? "#fff" : "#aaa"}
      backgroundColor={active ? colors.keyColor : "#fff"}
      border={{
        solid: 1,
        position: "all",
        color: active ? colors.keyColor : "#e2e2e2",
      }}
      borderRadius={12}
      padding={{ vertical: 8, horizontal: 10 }}
      onClick={() =>
        router.push({ query: { ...router.query, page: 1, ...payload } })
      }
    >
      {name}
    </TouchableOpacity>
  );
};
