import React, { ChangeEvent, useCallback, useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery, useMoment } from "@/libs/hooks";

//libs
import { V, Txt, Pagination, LoadingSpinner } from "@/_ui";
import { colors } from "@/libs/themes";

//apis
import { getAllEduTables } from "@/app/education/main/apis/getAllTables";

//components
import FilterBar from "./ConsoultFilterBar";
import NoneResultBox from "@/libs/components/_custom/NoneResultBox";

//
export default function ConsoultTable() {
  const { axiosInstance, router, routePath } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  //
  // 데이터
  const { data, isLoading } = useQuery(
    [queryKey.학습관리.상담, page, search],
    () => getAllEduTables({ axiosInstance, category: "상담", page, search }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  // 핸들러
  const handleOnchageSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearch(e.target.value);
    },
    [search]
  );

  return (
    <V.Column padding={{ horizontal: 16 }} gap={14}>
      <FilterBar search={search} onChangeSearch={handleOnchageSearch} />

      <V.Column
        shadow={{ x: 0, y: 3, blur: 20, color: "#eee" }}
        borderRadius={20}
      >
        {isLoading ? (
          <V.Container padding={{ all: 20 }}>
            <LoadingSpinner size={26} />
          </V.Container>
        ) : (
          <>
            {" "}
            {data?.count === 0 ? (
              <NoneResultBox
                padding="20px"
                description="상담 대한 정보가 없습니다"
              />
            ) : (
              <>
                <V.ScrollDragHorizontal>
                  <V.Column>
                    <V.Row padding={{ vertical: 13 }}>
                      {thead.map((item) => (
                        <Txt
                          size={12}
                          txtAlign="center"
                          key={item.th}
                          color={colors.grey500}
                          css={{
                            minWidth: item?.width,
                            maxWidth: item?.width,
                          }}
                        >
                          {item.th}
                        </Txt>
                      ))}
                    </V.Row>

                    <V.Column>
                      {data?.results?.map((item: any) => (
                        <V.Row
                          key={item?.id}
                          cursor="pointer"
                          onClick={() =>
                            router.push(
                              routePath.서비스.학습관리.상담 + "/" + item.id
                            )
                          }
                        >
                          {[
                            {
                              value: item?.is_read ? "읽음" : "미확인",
                              size: 120,
                            },
                            { value: item?.classification, size: 120 },
                            { value: item?.type, size: 160 },
                            {
                              value: useMoment(item?.date).format("yyyy.mm.dd"),
                              size: 160,
                            },
                            { value: item?.title, size: 280 },
                            { value: item?.created_by, size: 160 },
                          ].map((item, i) => (
                            <V.Column
                              maxWidth={item?.size}
                              minWidth={item?.size}
                              align="center"
                              padding={{ vertical: 14 }}
                              border={{
                                solid: 1,
                                position: "bottom",
                                color: colors.grey200,
                              }}
                            >
                              {i === 0 ? (
                                <Txt
                                  size={14}
                                  color={
                                    item?.value === "읽음"
                                      ? colors.blue
                                      : colors.grey800
                                  }
                                >
                                  {item.value}
                                </Txt>
                              ) : (
                                <V.Row
                                  crossAlign="center"
                                  maxWidth={item?.size - 20}
                                  scroll={{ type: "hidden" }}
                                >
                                  <Txt
                                    size={14}
                                    color={colors.grey800}
                                    whiteSpace="nowrap"
                                    css={{
                                      display: "inline-block",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {item.value}
                                  </Txt>
                                </V.Row>
                              )}
                            </V.Column>
                          ))}
                        </V.Row>
                      ))}
                    </V.Column>
                  </V.Column>
                </V.ScrollDragHorizontal>

                <V.Column align="center" padding={{ top: 20, bottom: 14 }}>
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={4}
                    totalItemsCount={data?.count}
                    pageRangeDisplayed={4}
                    hideFirstLastPages={true}
                    hideNavigation={true}
                    onChange={(pageNumber: number) => setPage(pageNumber)}
                  />
                </V.Column>
              </>
            )}
          </>
        )}
      </V.Column>
    </V.Column>
  );
}

const thead = [
  { th: "읽음 유무", width: 120 },
  { th: "과목", width: 120 },
  { th: "분류", width: 160 },
  { th: "날짜", width: 160 },
  { th: "제목", width: 280 },
  { th: "선생님", width: 160 },
];
