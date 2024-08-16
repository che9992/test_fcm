import React, { ChangeEvent } from "react";
import { useCore } from "@/libs/provider/useCore";
import { Input, Txt, TxtTab, V } from "@/_ui";

export default function FilterBar({
  search,
  onChangeSearch,
}: {
  search: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const { router, routePath } = useCore();

  return (
    <V.Column gap={8}>
      <V.Row gap={14} align="center">
        <Txt as="strong" size={18}>
          시험성적
        </Txt>

        <TxtTab
          onClick={() =>
            router.push(routePath.서비스.학습관리.시험 + "/create")
          }
        >
          + 추가하기
        </TxtTab>
      </V.Row>
      <Input.SearchField
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={onChangeSearch}
      />
    </V.Column>
  );
}
