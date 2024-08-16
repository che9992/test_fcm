import { V, Txt, TxtSpan } from "@/_ui";
import { colors } from "@/libs/themes/colors";
import { FileUploadBox } from "./FileUploadBox";
import { FileItems } from "./FileItems";

export default function FilesReader({
  isValues,
  onFileChange,
  fileUploadCancel,
}: {
  isValues: any;
  onFileChange: any;
  fileUploadCancel: any;
}) {
  return (
    <>
      <V.Column padding={{ top: 20 }} gap={12}>
        <FileUploadBox
          onChange={onFileChange}
          disabled={isValues.files.length === 3}
        />
        <Txt size={13} color={colors.grey500}>
          {
            " 파일 업로드 형식을 준수해주세요.\njpg, jpeg, png, webp, jfif, pdf\n(최대 3개 까지만 업로드 가능)"
          }
        </Txt>
      </V.Column>

      {isValues.files.length > 0 && (
        <V.Column gap={8} margin={{ top: 26 }}>
          <TxtSpan size={12} color="#aaa">
            첨부 파일
          </TxtSpan>

          <V.Column gap={6}>
            {isValues.files?.map((item: any, i: number) => {
              return (
                <FileItems
                  key={item?.file}
                  onCancel={() => fileUploadCancel(i)}
                >
                  {item?.title}
                </FileItems>
              );
            })}
          </V.Column>
        </V.Column>
      )}
    </>
  );
}
