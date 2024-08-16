"use client";
import React, { useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//apis
import { getAllMyContents } from "@/app/contents/apis/getAllMyContents";

//libs
import { V, Pagination, FlatList, Select, Input } from "@/_ui";
import { MQ } from "@/libs/themes";

//components
import View from "@/app/_layout/components/View";
import NoneResultBox from "@/libs/components/_custom/NoneResultBox";
import ActiveFilterBar from "@/libs/components/_custom/ActiveFilterBar";
import BuyContentBox from "@/app/contents/components/BuyContentBox";

//
export default function List() {
  const { router, axiosInstance } = useCore();
  const { useQuery, queryKey } = useTanstackQuery();
  const { page, search, status } = router.query;
  const [isSearch, setIsSearch] = useState("");

  const parsedPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const parsedSearch = Array.isArray(search) ? search[0] : search || "";
  const parsedStatus = Array.isArray(status) ? status[0] : status || "";

  // 데이터
  const { isLoading, data } = useQuery(
    [queryKey.콘텐츠.구매내역, page, search, status],
    () =>
      getAllMyContents({
        axiosInstance,
        page: parsedPage,
        search: parsedSearch,
        status: parsedStatus,
      }),
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return (
    <View category="콘텐츠" loading={isLoading}>
      <V.Container align="center">
        <V.Column
          maxWidth={790}
          gap={16}
          padding={{ top: 10, bottom: 60, horizontal: 16 }}
          css={{ [MQ[3]]: { padding: "10px 16px 30px 16px" } }}
        >
          <V.Row gap={8}>
            <V.Column maxWidth={100}>
              <Select
                value={status ? status : "all"}
                onChange={(e) =>
                  router.push({
                    query: { status: e.target.value, search, page: 1 },
                  })
                }
                options={[
                  { value: "전체", display_name: "전체" },
                  { value: "구매완료", display_name: "구매완료" },
                  { value: "구매확정", display_name: "구매확정" },
                  { value: "취소요청", display_name: "취소요청" },
                  { value: "구매취소", display_name: "구매취소" },
                ]}
                renderItem={(item) => (
                  <option key={item?.value} value={item?.value}>
                    {item?.display_name}
                  </option>
                )}
              />
            </V.Column>

            <Input.SearchField
              placeholder="검색어를 입력하세요"
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
              tab={{
                name: "검색",
                onClick: () =>
                  router.push({ query: { search: isSearch, status, page: 1 } }),
              }}
            />
          </V.Row>

          {(!!search || !!status) && (
            <ActiveFilterBar
              filters={[
                {
                  name: status,
                  onClick: () => router.push({ query: { search, status: "" } }),
                },
                {
                  name: search,
                  onClick: () => {
                    router.push({ query: { search: "", status } }),
                      setIsSearch("");
                  },
                },
              ]}
            />
          )}

          {/* 데이터 */}
          <FlatList
            data={data?.results}
            keyExtractor={(item) => item.id}
            renderItem={(item) => <BuyContentBox item={item} />}
            ListFooterComponent={
              <V.Column align="center">
                <Pagination
                  activePage={page ? Number(page) : 1}
                  itemsCountPerPage={12}
                  totalItemsCount={data?.count}
                  pageRangeDisplayed={4}
                  hideFirstLastPages={true}
                  hideNavigation={true}
                  onChange={(pageNumber: number) => {
                    router.push({
                      query: { search, status, page: pageNumber },
                    });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </V.Column>
            }
            ListEmptyComponent={
              <NoneResultBox
                description="데이터가 존재하지 않습니다"
                resetEvent={() => {
                  router.replace(router.pathname);
                  setIsSearch("");
                }}
              />
            }
          />
        </V.Column>
      </V.Container>
    </View>
  );
}

List.auth = true;
