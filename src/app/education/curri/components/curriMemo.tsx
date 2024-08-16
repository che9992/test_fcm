import { useCore } from "@/libs/provider/useCore";
import {
  useRef,
  useState,
  useMoment,
  useClickOutside,
  useTanstackQuery,
} from "@/libs/hooks";

//libs
import { Dialog, Input, Txt, TxtSpan, TxtTab, V } from "@/_ui";
import { colors } from "@/libs/themes";

//apis
import { updatedCurriMemo } from "@/app/education/curri/apis/updatedCurriMemo";
import { removeCurriMemo } from "@/app/education/curri/apis/removeCurriMemo";

//
export default function CurriMemo({
  item,
  resestPage,
}: {
  item: any;
  resestPage: () => void;
}) {
  const { axiosInstance } = useCore();
  const { queryKey, useQuery, useMutation, queryClient } = useTanstackQuery();
  const memoRef = useRef(null);

  const [editOpen, setEditOpen] = useState(false);
  const [isDialog, setIsDialog] = useState(false);

  const [memo, setMemo] = useState("");

  useClickOutside({
    ref: memoRef,
    state: editOpen,
    handler: () => {
      setEditOpen(false);
      setMemo("");
    },
  });

  //
  /// 코멘트 수정
  const { mutate: onUpdate } = useMutation(
    () => updatedCurriMemo({ axiosInstance, id: item.id, content: memo }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([queryKey.학습관리.커리큘럼상세_메모]);
        setEditOpen(false);
        setMemo("");
      },
    }
  );

  //
  /// 코멘트 삭제
  const { mutate: onDelete } = useMutation(
    () => removeCurriMemo({ axiosInstance, id: item.id }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([queryKey.학습관리.커리큘럼상세_메모]);
        setIsDialog(false);
        resestPage();
      },
    }
  );

  return (
    <>
      <V.Column>
        <V.Row crossAlign="space-between" key={item?.id}>
          <Txt weight="medium" size={14}>
            {item?.created_by}
          </Txt>
          <TxtSpan color={colors.grey400} size={12}>
            {useMoment(item?.created_at).format("yyyy.mm.dd")}
          </TxtSpan>
        </V.Row>

        <Txt color={colors.grey800} padding={{ top: 6 }}>
          {item.content}
        </Txt>

        {editOpen && (
          <V.Column padding={{ top: 10 }}>
            <Input.Textarea
              placeholder="메모 내용을 입력하세요."
              rows={4}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              css={{ fontSize: "14px" }}
              tab={{
                name: "수정",
                disabled: memo.length < 2,
                onClick: () => onUpdate(),
              }}
            />
          </V.Column>
        )}

        {item.is_editable && (
          <>
            {!editOpen && (
              <V.Row gap={8} padding={{ top: 10 }}>
                <TxtTab
                  padding={{ all: 2 }}
                  size={13}
                  color={colors.grey500}
                  onClick={() => setEditOpen(true)}
                >
                  수정
                </TxtTab>
                <TxtTab
                  padding={{ all: 2 }}
                  size={13}
                  color={colors.grey500}
                  onClick={() => setIsDialog(true)}
                >
                  삭제
                </TxtTab>
              </V.Row>
            )}
          </>
        )}
      </V.Column>

      {/* 삭제 */}
      <Dialog
        title="삭제 하시겠습니까?"
        description={`한번 삭제한 내용은\n복구가 어렵습니다`}
        open={isDialog}
        onCancel={() => setIsDialog(false)}
        tabs={[{ name: "코멘트 삭제", onClick: () => onDelete() }]}
      />
    </>
  );
}
