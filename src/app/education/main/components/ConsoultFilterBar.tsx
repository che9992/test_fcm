import React, { ChangeEvent } from "react";

import { useCore } from "@/libs/provider/useCore";
import { Input, Txt, V } from "@/_ui";

export default function ConsoultFilterBar({
  search,
  onChangeSearch,
}: {
  search: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const { router } = useCore();

  return (
    <V.Column gap={8}>
      <Txt as="strong" size={18}>
        상담 게시글
      </Txt>
      <Input.SearchField
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
    </V.Column>
  );
}
