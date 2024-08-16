import { ChangeEvent, useCallback, useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//libs
import { V, Txt, Pagination, LoadingSpinner } from "@/_ui";
import { colors } from "@/libs/themes";

//apis
import { getAllEduTables } from "@/app/education/main/apis/getAllTables";

//components
import FilterBar from "./GradeFilterBar";
import NoneResultBox from "@/libs/components/_custom/NoneResultBox";

//
export default function GradeTable() {
  const { router, axiosInstance, routePath } = useCore();
  const { queryKey, useQuery } = useTanstackQuery();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 핸들러
  const handleOnchageSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearch(e.target.value);
    },
    [search]
  );

  // 데이터
  const { data, isLoading } = useQuery(
    [queryKey.학습관리.시험성적, page, search],
    () => getAllEduTables({ axiosInstance, category: "성적", page, search }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
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
            {data?.count === 0 ? (
              <NoneResultBox
                padding="20px"
                description="성적에 대한 정보가 없습니다"
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
                              routePath.서비스.학습관리.시험 + "/" + item.id
                            )
                          }
                        >
                          {[
                            {
                              value: item?.exam,
                              size: 150,
                            },
                            {
                              value: item.korean,
                              score: item.korean_score,
                              size: 90,
                            },
                            {
                              value: item.math,
                              score: item.math_score,
                              size: 90,
                            },
                            {
                              value: item.english,
                              score: item.english_score,
                              size: 90,
                            },
                            {
                              value: item.research1,
                              score: item.research1_score,
                              size: 90,
                            },
                            {
                              value: item.research2,
                              score: item.research2_score,
                              size: 90,
                            },
                            {
                              value: item.history,
                              score: item.history_score,
                              size: 90,
                            },
                            {
                              value: item.foreign,
                              score: item.foreign_score,
                              size: 90,
                            },
                            { value: item.research1_subject, size: 110 },
                            { value: item.research2_subject, size: 110 },
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
                              <Txt size={14} color={colors.grey800}>
                                {item.value}{" "}
                                {i !== 0 &&
                                  (item?.score ? `(${item?.score})` : `(-)`)}
                              </Txt>
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
  { th: "시험", width: 150 },
  { th: "국어", width: 90 },
  { th: "수학", width: 90 },
  { th: "영어", width: 90 },
  { th: "탐구1", width: 90 },
  { th: "탐구2", width: 90 },
  { th: "한국사", width: 90 },
  { th: "제2외", width: 90 },
  { th: "탐구1 과목", width: 110 },
  { th: "탐구2 과목", width: 110 },
];
