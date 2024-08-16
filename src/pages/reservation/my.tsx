import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//libs
import { V, FlatList, Pagination } from "@/_ui";

//apis
import { getAllReservation } from "@/app/reservation/apis/getAllReservation";

//components
import { MyFilter, MyTable } from "@/app/reservation/components";
import View from "@/app/_layout/components/View";
import NoneResultBox from "@/libs/components/_custom/NoneResultBox";

//
export default function My() {
  const { axiosInstance, router } = useCore();
  const { page, type } = router.query ?? {};
  const { queryKey, useQuery } = useTanstackQuery();

  //
  /// 데이터 가져오기
  const { data, isLoading } = useQuery(
    [queryKey.예약하기.마이페이지, page, type],
    () =>
      getAllReservation({
        axiosInstance,
        category: "나의예약",
        page: page ?? 1,
        type: type ?? "computer",
      }),
    {
      onSuccess: (data) => {},
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return (
    <View category="예약관리" loading={isLoading}>
      <V.Column align="center">
        <V.Column
          maxWidth={732}
          padding={{ top: 30, bottom: 40, horizontal: 16 }}
        >
          <MyFilter />

          <FlatList
            data={data?.results}
            keyExtractor={(i) => i}
            renderItem={(item) => <MyTable item={item} data={data} />}
            ListFooterComponent={
              <V.Column align="center" margin={{ top: 20 }}>
                <Pagination
                  activePage={page ? Number(page) : 1}
                  itemsCountPerPage={10}
                  totalItemsCount={data?.count}
                  pageRangeDisplayed={3}
                  hideFirstLastPages={true}
                  hideNavigation={true}
                  onChange={(pageNumber: number) => {
                    router.push({ query: { page: pageNumber } });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </V.Column>
            }
            ListEmptyComponent={
              <NoneResultBox description="예약 내역이 존재하지 않습니다" />
            }
          />
        </V.Column>
      </V.Column>
    </View>
  );
}

My.auth = true;
