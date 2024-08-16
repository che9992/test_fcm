import { useCore } from "@/libs/provider/useCore";
import { useQuery } from "@tanstack/react-query";

//libs
import { Input, Select, Txt, TxtTab, V } from "@/_ui";

//apis
import { getTableOptions } from "@/app/education/main/apis/getTableOptions";

//
export default function FilterBar({
  state,
  onChangeState,
  search,
  onChangeSearch,
}: {
  state: string;
  onChangeState: any;
  search: string;
  onChangeSearch: any;
}) {
  const { router, axiosInstance, routePath } = useCore();

  const { data: option } = useQuery(["curri-option"], () =>
    getTableOptions({ axiosInstance })
  );

  return (
    <V.Column gap={8}>
      <V.Row gap={14} align="center">
        <Txt as="strong" size={18}>
          커리큘럼
        </Txt>

        <TxtTab
          onClick={() =>
            router.push(routePath.서비스.학습관리.커리큘럼 + "/create")
          }
        >
          + 추가하기
        </TxtTab>
      </V.Row>

      <V.Row gap={8}>
        <V.Row maxWidth={100}>
          <Select
            placeholder="전체"
            value={state ? state : "전체"}
            onChange={onChangeState}
            options={option?.state_choices}
            renderItem={(item) => (
              <Select.Option value={item.value} key={item?.value}>
                {item.display_name}
              </Select.Option>
            )}
          />
        </V.Row>

        <Input.SearchField
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={onChangeSearch}
        />
      </V.Row>
    </V.Column>
  );
}
