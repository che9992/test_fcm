import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { backRouteAtom } from "@/app/_layout/atoms/widgets-atom";
import { Dialog } from "@/_ui";

export default function BackDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(backRouteAtom);

  return (
    <>
      <Dialog
        title="페이지를 나가시겠습니까?"
        description={`페이지를 나가면\n입력된 내용은 복구가 불가합니다`}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        tabs={[
          {
            name: "지금 나가기",
            onClick: () => {
              setIsOpen(false);
              router.back();
            },
          },
        ]}
      />
    </>
  );
}
