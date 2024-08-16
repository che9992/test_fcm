import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTanstackQuery, useMoment } from "@/libs/hooks";
import { useCore } from "@/libs/provider/useCore";

//libs
import { Button, Calendar, Input, Select, Txt, V } from "@/_ui";

//atoms
import { useSetRecoilState } from "recoil";
import { alartAtom, loadingAtom } from "@/app/_layout/atoms/widgets-atom";

//apis
import { getCreateCurriOptions } from "@/app/education/curri/apis/getCreateCurriOptions";
import { createdCurri } from "@/app/education/curri/apis/createdCurri";
import { updatedCurri } from "@/app/education/curri/apis/updatedCurri";
import { getDetailCurri } from "@/app/education/curri/apis/getDetailCurri";

//components
import View from "@/app/_layout/components/View";

//
export default function Create() {
  const { router, axiosInstance } = useCore();
  const { queryKey, useQuery, useMutation } = useTanstackQuery();

  const setIsAlart = useSetRecoilState(alartAtom);
  const setIsLoading = useSetRecoilState(loadingAtom);

  const [isValue, setIsValue] = useState<any>({
    subject: "",
    section: "",
    title: "",
    author: "",
    start_date: "",
    end_date: "",
    state: "",
  });

  // 인풋 onChange
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsValue({ ...isValue, [name]: value });
  };

  //
  /// 옵션
  const { data: options } = useQuery(
    ["curri-add-option"],
    () => getCreateCurriOptions({ axiosInstance }),
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
    }
  );

  //
  /// 데이터 불러오기
  const { data: curriData } = useQuery(
    [queryKey.학습관리.커리큘럼상세, router.query.id],
    () => getDetailCurri({ axiosInstance, id: router.query.id }),
    {
      onSuccess: (data: any) => {
        setIsValue({
          ...isValue,
          subject: data?.subject,
          section: data?.section,
          title: data?.title,
          author: data?.author,
          start_date: new Date(data?.start_date),
          end_date: new Date(data?.end_date),
          state: data?.state,
        });
      },

      enabled: !!router.query.id,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const paramsData = {
    subject: isValue.subject,
    section: isValue.section,
    title: isValue.title,
    author: isValue.author,
    start_date: useMoment(isValue.start_date).format("yyyy-mm-dd"),
    end_date: useMoment(isValue.end_date).format("yyyy-mm-dd"),
    state: isValue.state,
  };

  // 성공
  const mutateOnSuccess = () => {
    setIsLoading(false);
    setIsAlart(true);
    router.back();
  };

  //
  /// 추가
  const { mutate: onAdd } = useMutation(
    () => createdCurri({ axiosInstance, ...paramsData }),
    {
      onSuccess: (data) => mutateOnSuccess(),
      onError: (error) => setIsLoading(false),
    }
  );

  //
  /// 수정
  const { mutate: onUpdate } = useMutation(
    () => updatedCurri({ axiosInstance, id: router.query.id, ...paramsData }),
    {
      onSuccess: (data) => mutateOnSuccess(),
      onError: (error) => setIsLoading(false),
    }
  );

  //
  /// 제출하기
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (router.query.id) onUpdate();
    else onAdd();
  };

  //
  ///
  useEffect(() => {
    if (isValue.state === "" || isValue.state === "진행 중") {
      setIsValue({ ...isValue, end_date: "" });
    }
  }, [isValue.state, isValue.end_date]);

  return (
    <>
      <View
        appTitle={router.query.id ? "커리수정" : "커리추가"}
        activeCancelModal
        navigator={false}
      >
        <V.Column align="center">
          <V.Form
            onSubmit={handleSubmit}
            maxWidth={600}
            gap={20}
            padding={{ top: 30, bottom: 40, horizontal: 16 }}
          >
            <Select
              label="과목"
              important="(필수)"
              placeholder="과목을 선택하세요"
              value={isValue.subject}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setIsValue({ ...isValue, subject: e.target.value })
              }
              options={options?.subject_choices}
              renderItem={(item) => (
                <option key={item.value} value={item.value}>
                  {item.display_name}
                </option>
              )}
            />

            <Select
              label="영역"
              important="(필수)"
              placeholder="영역을 선택하세요"
              value={isValue.section}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setIsValue({ ...isValue, section: e.target.value })
              }
              options={options?.section_choices}
              renderItem={(item) => (
                <option key={item.value} value={item.value}>
                  {item.display_name}
                </option>
              )}
            />

            <Input label="제목" important="(필수)">
              <Input.TextField
                name="title"
                type="text"
                placeholder="제목을 입력하세요"
                maxLength={20}
                value={isValue.title}
                onChange={handleOnChange}
              />
            </Input>

            <Input label="저자">
              <Input.TextField
                name="author"
                type="title"
                placeholder="저자를 입력하세요"
                maxLength={10}
                value={isValue.author}
                onChange={handleOnChange}
              />
            </Input>

            <Select
              label="상태"
              important="(필수)"
              placeholder="상태를 선택하세요"
              value={isValue.state}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setIsValue({ ...isValue, state: e.target.value })
              }
              options={options?.state_choices}
              renderItem={(item) => (
                <option value={item.value} key={item.value}>
                  {item.display_name}
                </option>
              )}
            />

            <V.Column
              padding={{ all: 18 }}
              backgroundColor="#f9f9f9"
              borderRadius={16}
            >
              <V.Column gap={6} padding={{ bottom: 20 }}>
                <Txt size={14} weight="medium">
                  시작일을 반드시 선택하세요
                </Txt>
                {!!isValue.start_date && (
                  <Txt color="#888" size={13}>
                    {useMoment(isValue.start_date).format("yyyy.mm.dd")} 로 선택
                    되었습니다
                  </Txt>
                )}
              </V.Column>
              <Calendar
                date={isValue.start_date}
                onClick={(date: any) =>
                  setIsValue({ ...isValue, start_date: date })
                }
              />
            </V.Column>

            {(isValue.state === "완강" || isValue.state === "중단") && (
              <V.Column
                padding={{ all: 18 }}
                backgroundColor="#f9f9f9"
                borderRadius={16}
              >
                <V.Column gap={6} padding={{ bottom: 20 }}>
                  <Txt size={14} weight="medium">
                    종료일 반드시 선택하세요
                  </Txt>
                  {!!isValue.end_date && (
                    <Txt color="#888" size={13}>
                      {useMoment(isValue.end_date).format("yyyy.mm.dd")} 로
                      선택되었습니다
                    </Txt>
                  )}
                </V.Column>
                <Calendar
                  date={isValue.end_date}
                  onClick={(date: any) => {
                    if (isValue.start_date)
                      setIsValue({ ...isValue, end_date: date });
                    else alert("시작일을 먼전 선택하세요.");
                  }}
                  minDate={isValue.start_date}
                />
              </V.Column>
            )}

            <Button
              type="submit"
              width="100%"
              disabled={
                (isValue.subject &&
                  isValue.section &&
                  isValue.title &&
                  isValue.start_date &&
                  isValue.state) === "" ||
                ((isValue.state === "완강" || isValue.state === "중단") &&
                  isValue.end_date === "")
              }
            >
              {router.query.id ? "커리수정" : "커리추가"}
            </Button>
          </V.Form>
        </V.Column>
      </View>
    </>
  );
}

Create.auth = true;
