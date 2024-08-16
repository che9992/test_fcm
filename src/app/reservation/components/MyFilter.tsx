import { Select, Spacing, Txt, V } from "@/_ui";
import { useRouter } from "next/router";

export default function MyFilter() {
  const router = useRouter();
  return (
    <>
      <V.Column gap={10}>
        <Txt as="strong" weight="bold">
          나의 예약 관리
        </Txt>
        <Txt color="#797979" size={14}>
          아래 필터를 통해
          <br />
          나의 예약 내용을 확인 및 취소할 수 있어요
        </Txt>
      </V.Column>

      <Spacing size={16} />

      <Select
        value={router.query.type ?? "computer"}
        onChange={(e) =>
          router.push({ query: { type: e.target.value, page: 1 } })
        }
        options={[
          { value: "computer", name: "컴퓨터 예약" },
          { value: "call", name: "전화 예약" },
          { value: "gym", name: "운동 예약" },
          { value: "extra_study", name: "심야자습 예약" },
        ]}
        renderItem={(item) => (
          <Select.Option value={item.value}>{item.name}</Select.Option>
        )}
      />

      <Spacing size={20} />
    </>
  );
}
