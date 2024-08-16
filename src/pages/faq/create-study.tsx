import React, { FormEvent, useState } from "react";
import { useCore } from "@/libs/provider/useCore";
import {
  useTanstackQuery,
  uploadFilesCloudinary,
  useFilesUpload,
} from "@/libs/hooks";

//apis
import { getDetailFaq } from "@/app/faq/apis/getDetailFaq";
import { getInquiriesOptions } from "@/app/faq/apis/getInquiriesOptions";
import { createdFaq } from "@/app/faq/apis/createdFaq";
import { updatedFaq } from "@/app/faq/apis/updatedFaq";

//libs
import { V, Txt, Input, Select, Button, useJenga } from "@/_ui";
import { colors } from "@/libs/themes";

//components
import View from "@/app/_layout/components/View";

//atoms
import { useSetRecoilState } from "recoil";
import { alartAtom, loadingAtom } from "@/app/_layout/atoms/widgets-atom";
import FilesReader from "@/libs/components/_custom/FilesReader";

//
export default function Create() {
  const { addToast } = useJenga();
  const { router, axiosInstance } = useCore();
  const { queryKey, useQuery, useMutation } = useTanstackQuery();

  const setIsAlart = useSetRecoilState(alartAtom);
  const setIsLoading = useSetRecoilState(loadingAtom);

  const [isValues, setIsValues] = useState({
    title: "",
    subject: "",
    want: "",
    teacher: "",
    text: "",
    files: [],
  });

  // 옵션
  const { data: options } = useQuery(
    ["faq-study-options-key"],
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
          title: data?.inquiry?.title,
          subject: data?.inquiry?.category,
          want: data?.inquiry?.prefer,
          teacher: data?.inquiry?.teacher?.id,
          text: data?.inquiry?.content,
          files: data?.inquiry_files,
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

  const onError = () => {
    setIsLoading(false);
    addToast({ status: "failed", title: "입력이 옳바른지 확인하세요" });
  };

  //
  /// 작성하기
  const { mutate: onCreate } = useMutation(
    (file: any) =>
      createdFaq({
        axiosInstance,
        learning_question: true,
        prefer: isValues.want,
        title: isValues.title,
        content: isValues.text,
        category: isValues.subject,
        teacher: isValues.teacher,
        files: file,
      }),
    {
      onSuccess: (data) => onSuccessQuery(data),
      onError: (error, variables, context) => onError(),
    }
  );

  //
  /// 수정하기
  const { mutate: onUpdate } = useMutation(
    (file: any) =>
      updatedFaq({
        axiosInstance,
        id: router.query.id,
        learning_question: true,
        prefer: isValues.want,
        title: isValues.title,
        content: isValues.text,
        category: isValues.subject,
        teacher: isValues.teacher,
        files: file,
      }),
    {
      onSuccess: (data) => onSuccessQuery(data),
      onError: (error, variables, context) => onError(),
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
      appTitle={router.query.id ? "학과 문의 수정" : "학과 문의 등록"}
      activeCancelModal
      navigator={false}
    >
      <V.Column
        maxWidth={600}
        gap={20}
        padding={{ top: 30, bottom: 40, horizontal: 16 }}
      >
        <V.Column gap={12}>
          <Txt as="strong">학과 선생님에게 문의하기</Txt>
          <Txt size={14} color={colors.grey700} lineHeight={1.4}>
            {
              "질의응답/상담 신청시 최대한 자세하게 적어주세요.\n선생님이 답변이 준비가 되면 온라인 또는 호출을 통해 답변을 드립니다.\n 질의응답/상담신청 뿐 아니라 자료요청 등 자유로운 문의가 가능 합니다."
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
            value={isValues.subject}
            onChange={(e) =>
              setIsValues({ ...isValues, subject: e.target.value })
            }
            options={options?.subject_category_choices}
            renderItem={(item) => (
              <option value={item.username} key={item?.display_name}>
                {item.display_name}
              </option>
            )}
          />

          <Select
            label="선호 답변 방식"
            important="(필수)"
            placeholder="선호 답변 방식을 선택하세요"
            value={isValues.want}
            onChange={(e) => setIsValues({ ...isValues, want: e.target.value })}
            options={options?.prefer_choices}
            renderItem={(item) => (
              <option value={item.value} key={item?.display_name}>
                {item.display_name}
              </option>
            )}
          />

          <Select
            label="선생님 선택"
            important="(필수)"
            placeholder="선생님을 선택 선택하세요"
            value={
              isValues.teacher ? isValues.teacher : "아무 선생님이든 상관없어요"
            }
            onChange={(e) =>
              setIsValues({ ...isValues, teacher: e.target.value })
            }
            options={[
              { value: "", username: "아무 선생님이든 상관없어요" },
              ...(Array.isArray(options?.teacher_choices)
                ? options?.teacher_choices
                : []),
            ]}
            renderItem={(item) => (
              <option value={item.id} key={item.id}>
                {item.username} ({item.subject})
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
            disabled={
              (isValues.title &&
                isValues.subject &&
                isValues.want &&
                isValues.text) === ""
            }
          >
            문의하기
          </Button>
        </V.Form>
      </V.Column>
    </View>
  );
}

Create.auth = true;
