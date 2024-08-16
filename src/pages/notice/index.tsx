import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery, useMoment, useState } from "@/libs/hooks";

//libs
import { V, Pagination, Txt, TxtSpan, Input, TouchableOpacity } from "@/_ui";
import { MQ, colors } from "@/libs/themes";

//apis
import { getAllNotices } from "@/app/notice/getAllNotices";

//components
import View from "@/app/_layout/components/View";
import NoneResultBox from "@/libs/components/_custom/NoneResultBox";
import ActiveFilterBar from "@/libs/components/_custom/ActiveFilterBar";

//
export default function List() {
  const { router, axiosInstance } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();

  const { page, search } = router.query;
  const [isSearch, setIsSearch] = useState("");

  const parsedPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const parsedSearch = Array.isArray(search) ? search[0] : search || "";

  // 데이터
  const { data, isLoading } = useQuery(
    [queryKey.공지사항.리스트, page, search],
    () =>
      getAllNotices({ axiosInstance, page: parsedPage, search: parsedSearch }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <View category="서비스" loading={isLoading}>
      <V.Column align="center">
        <V.Column
          maxWidth={740}
          gap={16}
          padding={{ top: 20, bottom: 60 }}
          css={{ [MQ[3]]: { paddingBottom: 30 } }}
        >
          <V.Column padding={{ horizontal: 20 }}>
            <Input.SearchField
              placeholder="검색어를 입력하세요"
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
              tab={{
                name: "검색",
                onClick: () =>
                  router.push({ query: { search: isSearch, page: 1 } }),
              }}
            />
          </V.Column>

          {data?.count === 0 ? (
            <NoneResultBox
              description={
                (!!router.query.search ? router.query.search : "공지정보가") +
                " 존재하지 않습니다"
              }
              resetEvent={() => {
                router.replace(router.pathname);
                setIsSearch("");
              }}
            />
          ) : (
            <V.Column
              padding={{ horizontal: 20 }}
              css={{ [MQ[3]]: { paddingLeft: 0, paddingRight: 0 } }}
            >
              {!!router.query.search && (
                <ActiveFilterBar
                  padding="0 20px 15px"
                  filters={[
                    {
                      name: router.query.search,
                      onClick: () => {
                        setIsSearch("");
                        router.push({ query: { ...router.query, search: "" } });
                      },
                    },
                  ]}
                />
              )}

              {data?.results?.map((item: any, i: number) => (
                <V.Column
                  key={item?.id}
                  backgroundColor={
                    item?.is_top_fixed ? colors.ground200 : colors.white
                  }
                  border={{ solid: 1, position: "bottom", color: "#eee" }}
                  css={{ opacity: item?.is_read ? 0.4 : 1 }}
                >
                  <TouchableOpacity
                    direction="vertical"
                    align="start"
                    width="100%"
                    maxWidth={400}
                    gap={4}
                    padding={{ vertical: 14, horizontal: 20 }}
                    onClick={() =>
                      router.push(`${router.pathname}/${item?.id}`)
                    }
                  >
                    <Txt
                      size={15}
                      whiteSpace="nowrap"
                      ellipsis={{ ellipsis: true, line: 1 }}
                    >
                      {item?.title}
                    </Txt>

                    <TxtSpan size={12} color="#999">
                      {useMoment(item?.created_at).format("yyyy.mm.dd")} |{" "}
                      {item?.views}명 조회
                    </TxtSpan>
                  </TouchableOpacity>
                </V.Column>
              ))}
            </V.Column>
          )}

          <V.Column align="center">
            <Pagination
              activePage={page ? Number(page) : 1}
              itemsCountPerPage={10}
              totalItemsCount={data?.count}
              pageRangeDisplayed={4}
              hideFirstLastPages={true}
              hideNavigation={true}
              onChange={(pageNumber: number) => {
                router.push({ query: { search, page: pageNumber } });
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            />
          </V.Column>
        </V.Column>
      </V.Column>
    </View>
  );
}

List.auth = true;
