import React, { useRef, useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//ui
import { Input, Spacing, Txt, V, Pagination } from "@/_ui";

//apis
import { getCurriMemos } from "@/app/education/curri/apis/getCurriMemos";
import { createdCurriMemo } from "@/app/education/curri/apis/createdCurriMemo";

//components
import CurriMemo from "./curriMemo";

//
export default function CurriMemos() {
  const { router, axiosInstance } = useCore();
  const { queryKey, useQuery, useMutation, queryClient } = useTanstackQuery();

  const memoRef = useRef(null);
  const [isMemo, setIsMemo] = useState("");
  const [isMemoCheck, setIsMemoCheck] = useState(false);
  const [isMemoPage, setIsMeomPage] = useState(1);

  //
  /// 데이터 > 코멘트 목록
  const { data: memoData } = useQuery(
    [queryKey.학습관리.커리큘럼상세_메모, router.query.id, isMemoPage],
    () =>
      getCurriMemos({ axiosInstance, id: router.query.id, page: isMemoPage }),
    {
      enabled: !!router.query.id,
      keepPreviousData: true,
    }
  );

  //
  /// 코멘트 추가
  const { mutate: createMemo } = useMutation(
    () =>
      createdCurriMemo({
        axiosInstance,
        curriculum: router.query.id,
        content: isMemo,
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([queryKey.학습관리.커리큘럼상세_메모]);
        setIsMemo("");
        setIsMemoCheck(false);
      },
    }
  );

  return (
    <>
      <Txt as="strong" size={16}>
        코멘트
      </Txt>

      <Spacing size={10} />

      <V.Row>
        <Input.Textarea
          placeholder="메모 내용을 입력하세요"
          ref={memoRef}
          value={isMemo}
          onChange={(e) => setIsMemo(e.target.value)}
          tab={{
            name: "작성",
            disabled: !isMemo || isMemo.length < 2,
            onClick: () => createMemo(),
          }}
        />
      </V.Row>

      <V.Column gap={24}>
        {memoData?.results?.map((item: any) => {
          return (
            <V.Column key={item?.id} margin={{ top: 20 }}>
              <CurriMemo item={item} resestPage={() => setIsMeomPage(1)} />
            </V.Column>
          );
        })}
      </V.Column>

      {/* 페이지 네이션 */}
      <V.Column align="center">
        <Pagination
          activePage={isMemoPage}
          itemsCountPerPage={4}
          totalItemsCount={memoData?.count}
          pageRangeDisplayed={3}
          hideFirstLastPages={true}
          hideNavigation={true}
          onChange={(pageNumber) => setIsMeomPage(pageNumber)}
        />
      </V.Column>
    </>
  );
}
