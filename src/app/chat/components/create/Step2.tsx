import { useCore } from "@/libs/provider/useCore";
import { useTanstackQuery, useState } from "@/libs/hooks";

//apis
import { getTeacherOptions } from "@/app/chat/apis/getTeacherOptions";

//libs
import { FlatList, LoadingSpinner, TouchableOpacity, Txt, V } from "@/_ui";
import { SearchField } from "@/_ui/Input/SearchField";

//components
import UserCard from "../card/UserCard";

//
const Step2 = ({
  teacher,
  handleAddTeacher,
}: {
  teacher: any;
  handleAddTeacher: (data: any) => void;
}) => {
  const { axiosInstance, router } = useCore();
  const [search, setIsSearch] = useState("");
  const { useQuery } = useTanstackQuery();

  const { data, isLoading } = useQuery({
    queryKey: ["chat-create-teacher-list-key", search],
    queryFn: () => getTeacherOptions({ axiosInstance, search }),
    enabled: router.query.step === "2",
  });

  return (
    <V.Column gap={20}>
      <V.Container padding={{ horizontal: 25 }}>
        <SearchField
          placeholder="선생님을 검색하세요"
          value={search}
          onChange={(e) => setIsSearch(e.target.value)}
        />
      </V.Container>

      <V.Column align="center" gap={5} padding={{ bottom: 40 }}>
        <FlatList
          loading={isLoading}
          ListLoadingComponent={<LoadingSpinner />}
          ListEmptyComponent={
            <V.Column padding={{ all: 20 }} align="center">
              <Txt color="#999" size={14}>
                선생님이 존재하지 않습니다
              </Txt>
            </V.Column>
          }
          data={data}
          itemGap={0}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <TouchableOpacity
              width="100%"
              padding={{ horizontal: 20, vertical: 11 }}
              onClick={() => handleAddTeacher(item.id)}
              backgroundColor={item?.id === teacher ? "#f5f6fc" : "#fff"}
            >
              <UserCard
                name={item?.name}
                avatar={item?.picture}
                detail={{
                  teacher: item?.subject + " 담당",
                }}
                category={item?.category}
              />
            </TouchableOpacity>
          )}
        />
      </V.Column>
    </V.Column>
  );
};

export { Step2 };

const users = [
  {
    id: 1682,
    category: "선생님",
    is_teacher: true,
    username: "삭제금지",
    email: "teacher@teacher.com",
    subject: "생활",
    joinTime: "2023-12-17T14:24:50.753000+09:00",
  },
  {
    id: 1683,
    category: "선생님",
    is_teacher: true,
    username: "삭제금지",
    email: "teacher@teacher.com",
    subject: "생활",
    joinTime: "2023-12-17T14:24:50.753000+09:00",
  },
  {
    id: 1684,
    category: "선생님",
    is_teacher: true,
    username: "삭제금지",
    email: "teacher@teacher.com",
    subject: "생활",
    joinTime: "2023-12-17T14:24:50.753000+09:00",
  },
  {
    id: 1685,
    category: "선생님",
    is_teacher: true,
    username: "삭제금지",
    email: "teacher@teacher.com",
    subject: "생활",
    joinTime: "2023-12-17T14:24:50.753000+09:00",
  },
];
