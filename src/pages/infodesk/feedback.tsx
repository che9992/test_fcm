import React, { FormEvent, useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import {
  useTanstackQuery,
  useFilesUpload,
  uploadFilesCloudinary,
} from "@/libs/hooks";

//libs
import { Button, Input, Spacing, Txt, TxtSpan, V } from "@/_ui";
import { colors } from "@/libs/themes/colors";

//ato,s
import { alartAtom, loadingAtom } from "@/app/_layout/atoms/widgets-atom";
import { useSetRecoilState } from "recoil";

//components
import { FileItems } from "@/libs/components/_custom/FileItems";
import { FileUploadBox } from "@/libs/components/_custom/FileUploadBox";
import View from "@/app/_layout/components/View";

//apis
import { createdFeedback } from "@/app/home/apis/createdFeedback";

export default function Feedback() {
  const { router, axiosInstance } = useCore();
  const { useMutation } = useTanstackQuery();

  const setIsAlart = useSetRecoilState(alartAtom);
  const setIsLoading = useSetRecoilState(loadingAtom);
  const [isValues, setIsValues] = useState({
    title: "",
    content: "",
    files: [],
  });

  // 파일 업로드 핸들러
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    useFilesUpload({ e, currentFilesLength: isValues.files.length })
      .then((newFiles) => {
        setIsValues((prevState: any) => ({
          ...prevState,
          files: [...prevState.files, ...newFiles],
        }));
      })
      .catch((error) => {
        console.error("파일업로드 실패", error);
      });
  };

  //
  /// 전송하기
  const { mutate: onCreate } = useMutation(
    (file: any) =>
      createdFeedback({
        axiosInstance,
        title: isValues.title,
        content: isValues.content,
        files: file,
      }),
    {
      onSuccess: (data) => {
        setIsLoading(false);
        setIsAlart(true);
        setIsValues({ title: "", content: "", files: [] });
      },
      onError: (error, variables, context) => setIsLoading(false),
    }
  );

  //
  /// 핸들러
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // 파일들만 Cloudinary에 업로드
    const uploadedImageUrls = await uploadFilesCloudinary({
      images: isValues.files.map((file: any) => file.file),
    });

    // 업로드된 URL들로 원래의 files 배열 업데이트
    const updatedFiles = isValues.files.map((file: any, index) => ({
      ...file,
      file: uploadedImageUrls[index],
    }));

    onCreate(updatedFiles);
  };

  return (
    <View
      navigator={false}
      backEvent={() => router.back()}
      borderBottom="1px solid #eee"
    >
      <V.Column
        padding={{ top: 30, bottom: 40, horizontal: 20 }}
        maxWidth={500}
        height="100%"
        css={{ flex: 1 }}
      >
        <Txt as="h1" size={24}>
          인트라넷 이용에
          <br /> 불편함이 있으셨나요?
        </Txt>

        <Spacing size={14} />

        <Txt size={15} color="#797979">
          {
            "이용 중인 인트라넷에 불편함이 있거나\n기능 개선이 필요하다면 여기로 남겨주세요!"
          }
        </Txt>

        <Spacing size={30} />

        <V.Form onSubmit={onSubmit}>
          <Input label="제목">
            <Input.TextField
              maxLength={30}
              placeholder="요청사항을 입력하세요"
              value={isValues.title}
              onChange={(e) =>
                setIsValues({ ...isValues, title: e.target.value })
              }
            />
          </Input>

          <Spacing size={20} />

          <Input label="요청내용">
            <Input.Textarea
              rows={10}
              placeholder="요청내용을 입력하세요"
              value={isValues.content}
              onChange={(e) =>
                setIsValues({ ...isValues, content: e.target.value })
              }
            />
          </Input>

          <V.Column
            margin={{ top: 20 }}
            backgroundColor="#fafafa"
            padding={{ all: 20 }}
            borderRadius={12}
          >
            <FileUploadBox
              onChange={onFileChange}
              disabled={isValues.files.length === 3}
            />

            <Spacing size={10} />

            <Txt size={13} color={colors.grey600}>
              {
                " 파일 업로드 형식을 준수해주세요.\njpg, jpeg, png, webp, jfif, pdf\n(최대 3개 까지만 업로드 가능)"
              }
            </Txt>

            <Spacing size={24} />

            {isValues.files.length > 0 && (
              <V.Column gap={8}>
                <TxtSpan size={12} color="#aaa">
                  첨부 파일
                </TxtSpan>

                <V.Column gap={6}>
                  {isValues.files?.map((item: any, i: number) => {
                    return (
                      <FileItems
                        key={item?.file}
                        onCancel={() =>
                          setIsValues((prevState) => ({
                            ...prevState,
                            files: prevState.files.filter(
                              (_, index) => index !== i
                            ),
                          }))
                        }
                      >
                        {item?.title}
                      </FileItems>
                    );
                  })}
                </V.Column>
              </V.Column>
            )}
          </V.Column>

          <V.Row margin={{ top: 30 }} gap={10}>
            <Button
              type="button"
              buttonColor="#eee"
              txtColor="#aaa"
              onClick={() => router.back()}
            >
              뒤로가기
            </Button>
            <Button
              width="100%"
              type="submit"
              disabled={(isValues.title && isValues.content) === ""}
            >
              제출하기
            </Button>
          </V.Row>
        </V.Form>
      </V.Column>
    </View>
  );
}

Feedback.auth = true;
