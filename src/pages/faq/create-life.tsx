import React, { FormEvent, useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import {
  useTanstackQuery,
  uploadFilesCloudinary,
  useFilesUpload,
} from "@/libs/hooks";

//libs
import { colors } from "@/libs/themes";
import { Button, Input, Select, Txt, V } from "@/_ui";

//apis
import { getDetailFaq } from "@/app/faq/apis/getDetailFaq";
import { getInquiriesOptions } from "@/app/faq/apis/getInquiriesOptions";
import { createdFaq } from "@/app/faq/apis/createdFaq";
import { updatedFaq } from "@/app/faq/apis/updatedFaq";

//components
import View from "@/app/_layout/components/View";
import FilesReader from "@/libs/components/_custom/FilesReader";

//atoms
import { useSetRecoilState } from "recoil";
import { alartAtom, loadingAtom } from "@/app/_layout/atoms/widgets-atom";

//
export default function Create() {
  const { router, axiosInstance } = useCore();
  const { queryKey, useQuery, useMutation } = useTanstackQuery();

  const setIsAlart = useSetRecoilState(alartAtom);
  const setIsLoading = useSetRecoilState(loadingAtom);

  const [isValues, setIsValues] = useState({
    title: "",
    kind: "",
    text: "",
    files: [],
    getFiles: [],
  });

  // 옵션
  const { data: options } = useQuery(
    ["faq-life-options-key"],
    () => getInquiriesOptions({ axiosInstance }),
    {
      refetchOnWindowFocus: false,
    }
  );

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

  // 데이터 가져오기
  const { data: detailData } = useQuery(
    [queryKey.문의하기.상세, router.query.id],
    () => getDetailFaq({ axiosInstance, id: router.query.id }),
    {
      onSuccess: (data) => {
        setIsValues({
          ...isValues,
          title: data.inquiry.title,
          kind: data.inquiry.category,
          text: data.inquiry.content,
          files: data.inquiry_files,
        });
      },

      refetchOnWindowFocus: false,
      enabled: !!router.query.id,
    }
  );

  //
  /// 성공시
  const onSuccessQuery = (data: any) => {
    console.log("제출 성공", data);
    router.back();
    setIsLoading(false);
    setIsAlart(true);
  };

  //
  /// 작성하기
  const { mutate: onCreate } = useMutation(
    (file: any) =>
      createdFaq({
        axiosInstance,
        learning_question: false,
        title: isValues.title,
        content: isValues.text,
        category: isValues.kind,
        files: file,
      }),
    {
      onSuccess: (data) => onSuccessQuery(data),
      onError: (error, variables, context) => setIsLoading(false),
    }
  );

  //
  /// 수정하기
  const { mutate: onUpdate } = useMutation(
    (file: any) =>
      updatedFaq({
        axiosInstance,
        id: router.query.id,
        learning_question: false,
        title: isValues.title,
        content: isValues.text,
        category: isValues.kind,
        files: file,
      }),
    {
      onSuccess: (data) => onSuccessQuery(data),
      onError: (error, variables, context) => setIsLoading(false),
    }
  );

  //
  /// 핸들러 : 업로드 or 수정
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

    if (router.query.id) {
      onUpdate(updatedFiles);
    } else {
      onCreate(updatedFiles);
    }
  };

  return (
    <View
      appTitle={router.query.id ? "생활 문의 수정" : "생활 문의 등록"}
      activeCancelModal
      navigator={false}
    >
      <V.Container
        maxWidth={600}
        gap={20}
        padding={{ top: 30, bottom: 40, horizontal: 16 }}
      >
        <V.Column gap={12}>
          <Txt as="strong">생활 선생님에게 문의하기</Txt>
          <Txt size={14} color={colors.grey700} lineHeight={1.4}>
            {
              "학원 전반에 관련된 문의사항 및 요청 사항,\n학원 내 시설 수리 요청 등 다양한 문의가 가능합니다."
            }
          </Txt>
        </V.Column>

        <V.Form margin={{ top: 10 }} gap={22} onSubmit={onSubmit}>
          <Input label="제목" important="(필수)">
            <Input.TextField
              maxLength={30}
              placeholder="제목을 30자 이하로 작성하세요"
              value={isValues.title}
              onChange={(e) =>
                setIsValues({ ...isValues, title: e.target.value })
              }
            />
          </Input>

          <Select
            label="과목선택"
            important="(필수)"
            placeholder="과목을 선택하세요"
            value={isValues.kind}
            onChange={(e) => setIsValues({ ...isValues, kind: e.target.value })}
            options={["시설", "생활", "기타"]}
            renderItem={(item) => (
              <option value={item} key={item}>
                {item}
              </option>
            )}
          />

          <Input label="문의 내용" important="(필수)">
            <Input.Textarea
              rows={7}
              placeholder="문의 내용을 입력하세요"
              value={isValues.text}
              onChange={(e) =>
                setIsValues({ ...isValues, text: e.target.value })
              }
            />
          </Input>

          <FilesReader
            isValues={isValues}
            onFileChange={onFileChange}
            fileUploadCancel={(i: number) =>
              setIsValues((prevState) => ({
                ...prevState,
                files: prevState.files.filter((_, index) => index !== i),
              }))
            }
          />

          <Button
            width="100%"
            type="submit"
            margin={{ top: 10 }}
            disabled={(isValues.title && isValues.kind && isValues.text) === ""}
          >
            문의하기
          </Button>
        </V.Form>
      </V.Container>
    </View>
  );
}

Create.auth = true;
