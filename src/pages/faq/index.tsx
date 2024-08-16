import { useCore } from "@/libs/provider/useCore";
import { useState, useMoment, useTanstackQuery } from "@/libs/hooks";

//libs
import {
  V,
  Input,
  Select,
  TouchableOpacity,
  Txt,
  TxtSpan,
  Pagination,
  Dialog,
} from "@/_ui";
import { MQ, colors } from "@/libs/themes";

//apis
import { getAllFaqs } from "@/app/faq/apis/getAllFaqs";

//components
import View from "@/app/_layout/components/View";
import NoneResultBox from "@/libs/components/_custom/NoneResultBox";
import ActiveFilterBar from "@/libs/components/_custom/ActiveFilterBar";

//
export default function List() {
  const { axiosInstance, router } = useCore();
  const { queryKey, useQuery, useMutation } = useTanstackQuery();

  const { page, search, subject } = router.query;
  const [isSearch, setIsSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const parsedPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const parsedSubject = Array.isArray(subject) ? subject[0] : subject || "전체";
  const parsedSearch = Array.isArray(search) ? search[0] : search || "";

  // 데이터
  const { isLoading, data } = useQuery(
    [queryKey.문의하기.리스트, page, subject, search],
    () =>
      getAllFaqs({
        axiosInstance,
        page: parsedPage,
        status: parsedSubject,
        search: parsedSearch,
      }),
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return (
    <View
      category="문의하기"
      loading={isLoading}
      addEvent={() => setIsCreateOpen(true)}
    >
      <V.Container align="center">
        <V.Column
          maxWidth={740}
          gap={16}
          padding={{ top: 20, bottom: 60 }}
          css={{ [MQ[3]]: { paddingTop: 10, paddingBottom: 30 } }}
        >
          <V.Row padding={{ horizontal: 20 }} gap={8}>
            <V.Column maxWidth={100}>
              <Select
                value={subject ? subject : "전체"}
                onChange={(e) =>
                  router.push({
                    query: { subject: e.target.value, search, page: 1 },
                  })
                }
                options={[
                  { value: "전체", display_name: "전체" },
                  { value: "처리 중", display_name: "처리 중" },
                  { value: "답변완료", display_name: "답변완료" },
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
                (!!router.query.search ? router.query.search : "데이터가") +
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
                    gap={4}
                    padding={{ vertical: 14, horizontal: 20 }}
                    onClick={() =>
                      router.push(`${router.pathname}/${item?.id}`)
                    }
                  >
                    <TouchableOpacity crossAlign="start" maxWidth={400}>
                      <Txt
                        size={14}
                        color={colors.grey800}
                        whiteSpace="nowrap"
                        ellipsis={{ ellipsis: true, line: 1 }}
                      >
                        {item?.title}
                      </Txt>
                    </TouchableOpacity>

                    <V.Row crossAlign="space-between">
                      <TxtSpan size={12} color={colors.grey500}>
                        {item.category}
                        {item.learning_question &&
                          `˙ ${
                            item.teacher
                              ? item.teacher.username + "\t선생님"
                              : "선택없음"
                          }`}
                      </TxtSpan>

                      <TxtSpan size={12} color={colors.grey500}>
                        {item.status} ˙{" "}
                        {useMoment(item.updated_at).format("yyyy.mm.dd")} 등록
                      </TxtSpan>
                    </V.Row>
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
      </V.Container>

      <Dialog
        title="문의할 타입을 선택하세요"
        description={`문의타입 선택 후 문의내용을 작성하세요\n확인 후 선생님이 답변드리고 있어요!`}
        open={isCreateOpen}
        onCancel={() => setIsCreateOpen(false)}
        tabs={[
          {
            name: "생활 문의하기",
            onClick: () => {
              router.push(router.pathname + "/create-life");
              setIsCreateOpen(false);
            },
            buttonColor: colors.blueBg,
            txtColor: colors.keyColor,
          },
          {
            name: "학과 문의하기",
            onClick: () => {
              router.push(router.pathname + "/create-study");
              setIsCreateOpen(false);
            },
          },
        ]}
      />
    </View>
  );
}

List.auth = true;
