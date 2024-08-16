import { useCore } from "@/libs/provider/useCore";
import { useMoment, useTanstackQuery, useState } from "@/libs/hooks";

//libs
import {
  V,
  Pagination,
  Txt,
  TxtSpan,
  Input,
  TouchableOpacity,
  Select,
} from "@/_ui";
import { MQ, colors } from "@/libs/themes";

//apis
import { getLibraryOptions } from "@/app/library/getLibraryOptions";
import { getAllLibraries } from "@/app/library/getAllLibraries";

//components
import View from "@/app/_layout/components/View";
import NoneResultBox from "@/libs/components/_custom/NoneResultBox";
import ActiveFilterBar from "@/libs/components/_custom/ActiveFilterBar";

//
export default function List() {
  const { router, axiosInstance } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();

  const { page, search, subject } = router.query;
  const [isSearch, setIsSearch] = useState("");

  // 옵션
  const { data: options } = useQuery(
    [queryKey.자료실.리스트 + "options"],
    () => getLibraryOptions({ axiosInstance }),
    {
      keepPreviousData: true,
    }
  );

  // 데이터
  const { data, isLoading } = useQuery(
    [queryKey.자료실.리스트, page, subject, search],
    () =>
      getAllLibraries({
        axiosInstance,
        page: page ? Number(page) : 1,
        subject: subject ?? "",
        search: search ?? "",
      }),
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
          <V.Row padding={{ horizontal: 20 }} gap={8}>
            <V.Column maxWidth={80}>
              <Select
                value={subject ? subject : "전체"}
                onChange={(e) =>
                  router.push({
                    query: { subject: e.target.value, search, page: 1 },
                  })
                }
                options={[
                  { value: "전체", display_name: "전체" },
                  ...(Array.isArray(options?.subject_choices)
                    ? options?.subject_choices
                    : []),
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
                  router.push({
                    query: { subject: subject, search: isSearch, page: 1 },
                  }),
              }}
            />
          </V.Row>

          {data?.count === 0 ? (
            <NoneResultBox
              description={
                (!!router.query.search ? router.query.search : "데이터") +
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
              {(!!router.query.search || !!router.query.subject) && (
                <ActiveFilterBar
                  padding="0 20px 15px"
                  filters={[
                    {
                      name: router.query.subject,
                      onClick: () =>
                        router.push({
                          query: { ...router.query, subject: "" },
                        }),
                    },
                    {
                      name: router.query.search,
                      onClick: () => {
                        router.push({
                          query: { ...router.query, search: "" },
                        });
                        setIsSearch("");
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
                    width="100%"
                    direction="vertical"
                    align="start"
                    maxWidth={400}
                    gap={4}
                    padding={{ all: 14 }}
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
                      {item.subject} | {item?.views}명 조회
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
                router.push({
                  query: { search, subject, page: pageNumber },
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </V.Column>
        </V.Column>
      </V.Column>
    </View>
  );
}

List.auth = true;
