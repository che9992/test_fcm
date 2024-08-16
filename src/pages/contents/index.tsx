import React, { useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { GetServerSideProps } from "next";

//libs
import {
  Input,
  Select,
  Txt,
  TxtSpan,
  V,
  FlatList,
  Image,
  Pagination,
} from "@/_ui";
import { MQ, colors } from "@/libs/themes";

//components
import View from "@/app/_layout/components/View";
import NoneResultBox from "@/libs/components/_custom/NoneResultBox";
import ActiveFilterBar from "@/libs/components/_custom/ActiveFilterBar";

//assets
import { noneImg } from "@/libs/assets/images";

//apis
import { getAllContents } from "@/app/contents/apis/getAllContents";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  const path = context.req.url;
  const fullUrl = `${protocol}://${host}${path}`;

  const userAgent = context.req.headers["user-agent"] || "";

  if (userAgent.includes("KAKAOTALK")) {
    return {
      redirect: {
        destination: `kakaotalk://web/openExternal?url=${encodeURIComponent(
          fullUrl
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

//
export default function Contaents() {
  const { router, axiosInstance } = useCore();
  const { useQuery, queryKey } = useTanstackQuery();

  const { page, search, on_sale } = router.query;
  const [isSearch, setIsSearch] = useState("");

  const parsedPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const parsedSearch = Array.isArray(search) ? search[0] : search || "";
  const parsedOnSale = Array.isArray(on_sale) ? on_sale[0] : on_sale || "";

  // 데이터
  const { isLoading, data } = useQuery(
    [queryKey.콘텐츠.리스트, page, search, on_sale],
    () =>
      getAllContents({
        axiosInstance,
        page: parsedPage,
        search: parsedSearch,
        on_sale: parsedOnSale,
      }),
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onSuccess: (res) => {},
      onError: (error) => {},
    }
  );

  return (
    <View category="콘텐츠" loading={isLoading}>
      <V.Column align="center">
        <V.Column
          maxWidth={790}
          gap={16}
          padding={{ top: 30, bottom: 40, horizontal: 16 }}
        >
          {/* 필터링 */}
          <V.Row gap={8}>
            <V.Row maxWidth={90}>
              <Select
                value={on_sale ? on_sale : "all"}
                onChange={(e) =>
                  router.push({
                    query: { on_sale: e.target.value, search, page: 1 },
                  })
                }
                options={[
                  { value: "all", display_name: "전체" },
                  { value: true, display_name: "진행중" },
                  { value: false, display_name: "마감" },
                ]}
                renderItem={(item) => (
                  <option key={item?.value} value={item?.value}>
                    {item?.display_name}
                  </option>
                )}
              />
            </V.Row>

            <Input.SearchField
              placeholder="검색어를 입력하세요"
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
              tab={{
                name: "검색",
                onClick: () =>
                  router.push({
                    query: { search: isSearch, on_sale, page: 1 },
                  }),
              }}
            />
          </V.Row>

          <FlatList
            direction="horizontal"
            itemGap={15}
            itemCrossGap={30}
            itemHorizontalCount={{ desktop: 3, tablet: 2, mobile: 2 }}
            data={data?.results}
            keyExtractor={(item) => item?.id}
            renderItem={(item) => (
              <V.Column
                gap={4}
                key={item?.id}
                onClick={() => router.push(`${router.pathname}/${item?.id}`)}
                css={{
                  cursor: "pointer",
                  flex: "0 0 calc(33.333% - 14px)",
                  [MQ[1]]: { flex: "0 0 calc(50% - 10px)" },
                }}
              >
                <Image
                  source={item?.thumbnail ? item?.thumbnail : noneImg}
                  alt={item?.title}
                  ratio={{ x: 1, y: 1 }}
                  borderRadius={10}
                  objectFit="cover"
                />

                <V.Row
                  margin={{ top: 8 }}
                  align="center"
                  crossAlign="space-between"
                >
                  <V.Column gap={4}>
                    <Txt
                      as="strong"
                      size={15}
                      weight="normal"
                      color={!item?.on_sale ? colors.grey600 : colors.black100}
                      ellipsis={{ ellipsis: true, line: 1 }}
                    >
                      {item?.title}
                    </Txt>

                    <TxtSpan
                      size={15}
                      weight="medium"
                      color={!item?.on_sale ? colors.grey500 : colors.keyColor}
                    >
                      {item?.price
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </TxtSpan>
                  </V.Column>

                  {!item?.on_sale && (
                    <TxtSpan
                      size={14}
                      color={colors.red}
                      margin={{ right: 10 }}
                    >
                      마감
                    </TxtSpan>
                  )}
                </V.Row>
              </V.Column>
            )}
            ListHeaderComponent={
              <>
                {(!!search || !!on_sale) && (
                  <ActiveFilterBar
                    filters={[
                      {
                        name:
                          (on_sale === "all" && "전체") ||
                          (on_sale === "true" && "진행중") ||
                          (on_sale === "false" && "마감"),
                        onClick: () =>
                          router.push({
                            query: { search, on_sale: "", page: 1 },
                          }),
                      },
                      {
                        name: search,
                        onClick: () => {
                          setIsSearch("");
                          router.push({
                            query: { search: "", on_sale, page: 1 },
                          });
                        },
                      },
                    ]}
                  />
                )}
              </>
            }
            ListFooterComponent={
              <V.Column align="center" padding={{ top: 20 }}>
                <Pagination
                  activePage={page ? Number(page) : 1}
                  itemsCountPerPage={12}
                  totalItemsCount={data?.count}
                  pageRangeDisplayed={4}
                  hideFirstLastPages={true}
                  hideNavigation={true}
                  onChange={(pageNumber: number) => {
                    router.push({
                      query: { search, on_sale, page: pageNumber },
                    });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </V.Column>
            }
            ListEmptyComponent={
              <NoneResultBox
                description="해당 콘텐츠는 존재하지 않습니다"
                resetEvent={() => {
                  router.replace("/contents/list");
                  setIsSearch("");
                }}
              />
            }
          />
        </V.Column>
      </V.Column>
    </View>
  );
}

Contaents.auth = true;
