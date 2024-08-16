import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getSubjectOptions } from "@/app/chat/apis/getSubjectOptions";

//libs
import { Select, Spacing, TouchableOpacity, Txt, V } from "@/_ui";

//
const Step1 = () => {
  const { router, axiosInstance } = useCore();
  const { category } = router.query ?? {};
  const { useQuery } = useTanstackQuery();

  const handleCategory = (category: any) =>
    router.replace({ query: { ...router.query, category } });

  const { data: options_db, isLoading } = useQuery({
    queryKey: ["eud-chat-create-step1-key"],
    queryFn: () => getSubjectOptions({ axiosInstance }),
  });

  const options = options_db ? options_db : options_test;

  return (
    <V.Column padding={{ vertical: 30, horizontal: 25 }}>
      <Txt as="h1" size={20}>
        채팅방 카테고리를 <br />
        반드시 선택하세요
      </Txt>

      <Spacing size={25} />

      <V.Column gap={10}>
        <TouchableOpacity
          css={containerTheme(category === "")}
          onClick={() => handleCategory("")}
        >
          <Txt size={16} weight="bold">
            학과 선생님 지정 초대
          </Txt>

          <Txt size={14} color="#797979">
            학과 선생님을 직접 선택하여 대화할 수 있어요
          </Txt>
        </TouchableOpacity>

        <TouchableOpacity
          css={containerTheme(options[0].some((el: any) => el === category))}
        >
          <Txt size={16} weight="bold">
            학과 선생님 미지정 초대
          </Txt>

          <Txt size={14} color="#797979" padding={{ bottom: 8 }}>
            학원에서 담당 학과 선생님을 지정해주며
            <br /> 선생님이 배치되면 이후 대화할 수 있어요
          </Txt>

          <Select
            maxWidth={100}
            options={options[0]}
            placeholder="선택"
            value={
              category
                ? options[0].some((el: any) => el === category)
                  ? category
                  : ""
                : ""
            }
            onChange={(e) => handleCategory(e.target.value)}
            renderItem={(item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          css={containerTheme(options[1].some((el: any) => el === category))}
        >
          <Txt size={16} weight="bold">
            생활 선생님 초대하기
          </Txt>

          <Txt size={14} color="#797979" padding={{ bottom: 8 }}>
            아래 카테고리 선택 시, 생활 선생님과 대화할 수 있으며,
            <br />
            선생님이 배치되면 이후 대화할 수 있어요
          </Txt>

          <Select
            maxWidth={100}
            options={options[1]}
            placeholder="선택"
            value={
              category
                ? options[1].some((el: any) => el === category)
                  ? category
                  : ""
                : ""
            }
            onChange={(e) => handleCategory(e.target.value)}
            renderItem={(item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )}
          />
        </TouchableOpacity>
      </V.Column>
    </V.Column>
  );
};

export { Step1 };

const containerTheme = (active: any): any => {
  return {
    width: "100%",
    flexDirection: "column",
    alignItems: "start",
    padding: 18,
    borderRadius: 10,
    rowGap: 8,
    backgroundColor: active ? "#eef4fb" : "#f6f6f6",
  };
};

const options_test = [
  ["국어", "수학", "영어", "사탐", "과탐", "입시"],
  ["생활", "시설", "행정", "기타"],
];
