import { ChangeEvent, useCallback, useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//libs
import { V, Txt, Pagination, LoadingSpinner } from "@/_ui";
import { colors } from "@/libs/themes";

//apis
import { getAllEduTables } from "@/app/education/main/apis/getAllTables";

//components
import NoneResultBox from "@/libs/components/_custom/NoneResultBox";
import FilterBar from "./CurriFilterBar";

//
export default function CurriTable() {
  const { router, routePath, axiosInstance } = useCore();
  const { useQuery, queryKey } = useTanstackQuery();
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [page, setPage] = useState(1);

  //
  // 데이터
  const { data, isLoading } = useQuery(
    [queryKey.학습관리.커리큘럼, page, search, state],
    () =>
      getAllEduTables({
        axiosInstance,
        category: "커리큘럼",
        page,
        state,
        search,
      }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  //
  //
  const handleOnChageState = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value),
    [state]
  );
  const handleOnChageSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearch(e.target.value);
    },
    [search]
  );

  return (
    <V.Column padding={{ horizontal: 16 }} gap={14}>
      <FilterBar
        state={state}
        search={search}
        onChangeState={handleOnChageState}
        onChangeSearch={handleOnChageSearch}
      />

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
            {data?.count === 0 ? (
              <NoneResultBox
                padding="20px"
                description="커리큘럼에 대한 정보가 없습니다"
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
                          onClick={() =>
                            router.push(
                              routePath.서비스.학습관리.커리큘럼 + "/" + item.id
                            )
                          }
                        >
                          {[
                            { value: item?.subject, size: 120 },
                            { value: item?.section, size: 120 },
                            { value: item?.title, size: 200 },
                            { value: item?.author, size: 140 },
                            { value: item?.start_date, size: 140 },
                            { value: item?.end_date, size: 140 },
                            { value: item?.state, size: 140 },
                          ].map((item) => (
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
                                  {!!item?.value ? item?.value : "-"}
                                </Txt>
                              </V.Row>
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
  { th: "과목", width: 120 },
  { th: "영역", width: 120 },
  { th: "제목", width: 200 },
  { th: "저자", width: 140 },
  { th: "시작일", width: 140 },
  { th: "종료일", width: 140 },
  { th: "상태", width: 140 },
];
