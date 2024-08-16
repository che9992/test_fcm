import React, { ChangeEvent, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

//libs
import {
  V,
  Pagination,
  Input,
  Txt,
  TxtSpan,
  Button,
  Checkbox,
  Select,
  BottomSheet,
  P,
  Spacing,
  LoadingSpinner,
  TouchableOpacity,
} from "@/_ui";
import { colors } from "@/libs/themes/colors";
import { WarningIcon } from "@/libs/assets/icons";

//apis
import { getJoinUsSchools } from "@/app/joinUs/apis/getJoinUsSchools";

//atom
import { joinFieldAtom } from "@/app/joinUs/atoms/join-field-atom";
import { useRecoilState } from "recoil";

//utils
import { regEx } from "@/libs/utils/regEx";

//
export default function JoinStep2({
  options,
  onStepNext,
}: {
  options: any;
  onStepNext: () => void;
}) {
  const queryClient = useQueryClient();
  const [isValues, setIsValues] = useRecoilState(joinFieldAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchSchool, setSearchSchool] = useState<string>("");
  const [pageSchool, setPageSchool] = useState(1);

  // 핸들러
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsValues({ ...isValues, [name]: value });
  };

  // 학교리스트 쿼리
  const { data: schools, isLoading } = useQuery(
    ["schools", searchSchool, pageSchool],
    () => getJoinUsSchools({ search: searchSchool, page: pageSchool }),
    {
      enabled: !!isModalOpen,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  console.log(options);

  useEffect(() => {
    if (isValues.koelang === "0") setIsValues({ ...isValues, koelang: "1" });
    if (isValues.math === "0") setIsValues({ ...isValues, math: "1" });
    if (isValues.eng === "0") setIsValues({ ...isValues, eng: "1" });
    if (isValues.exploration1 === "0")
      setIsValues({ ...isValues, exploration1: "1" });
    if (isValues.exploration2 === "0")
      setIsValues({ ...isValues, exploration2: "1" });
  }, [
    isValues.koelang,
    isValues.math,
    isValues.eng,
    isValues.exploration1,
    isValues.exploration2,
  ]);

  return (
    <>
      <V.Column gap={20}>
        <Input label="어머니 성함">
          <Input.TextField
            name="motherName"
            placeholder="어머니 성합을 입력하세요"
            value={isValues.motherName}
            onChange={handleOnChange}
            error={{
              error: !!isValues.motherTel && !isValues.motherName,
              message: "어머니 성함을 입력하세요.",
            }}
          />
        </Input>

        <Input label="어머니 연락처">
          <Input.PhoneNumberField
            placeholder="- 를 제외하여 입력하세요"
            value={isValues.motherTel}
            onChange={(e) =>
              setIsValues({ ...isValues, motherTel: e.target.value })
            }
            error={{
              error:
                (!!isValues.motherTel &&
                  !regEx.phoneNumber.test(isValues.motherTel)) ||
                (!!isValues?.motherName &&
                  !regEx.phoneNumber.test(isValues.motherTel)),
              message:
                !!isValues?.motherName && !isValues.motherTel
                  ? "어머니 연락처를 입력하세요"
                  : '"ex_01012345678 정확히 입력하세요',
            }}
          />
        </Input>

        <Input label="아버지 성함">
          <Input.TextField
            name="fatherName"
            placeholder="아버지 성합을 입력하세요"
            value={isValues.fatherName}
            onChange={handleOnChange}
            error={{
              error: !!isValues.fatherTel && !isValues.fatherName,
              message: "아버지 성함을 입력하세요.",
            }}
          />
        </Input>

        <Input label="아버지 연락처">
          <Input.PhoneNumberField
            placeholder="- 를 제외하여 입력하세요"
            value={isValues.fatherTel}
            onChange={(e) =>
              setIsValues({ ...isValues, fatherTel: e.target.value })
            }
            error={{
              error:
                (!!isValues.fatherTel &&
                  !regEx.phoneNumber.test(isValues.fatherTel)) ||
                (!!isValues?.fatherName &&
                  !regEx.phoneNumber.test(isValues.fatherTel)),
              message:
                !!isValues?.fatherName && !isValues.fatherTel
                  ? "아버지 연락처를 입력하세요"
                  : '"ex_01012345678 정확히 입력하세요',
            }}
          />
        </Input>

        <Select
          label="학년도"
          important="*"
          options={options?.schoolyear_choices}
          placeholder="학년도를 선택하세요"
          value={isValues.schoolYear}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setIsValues({ ...isValues, schoolYear: e.target.value })
          }
          renderItem={(item) => (
            <Select.Option value={item.id} key={item.id}>
              {item.title}
            </Select.Option>
          )}
        />

        <Input label="출신학교" important="*">
          <Input.Dummy
            placeholder="출신학교를 선택하세요"
            value={isValues.shcoolName}
            onClick={() => setIsModalOpen(true)}
          />
        </Input>

        <Input label="이전 수능 성적" important="*">
          <V.Row gap={16}>
            <Checkbox
              label={{ title: "응시" }}
              id="응시"
              checked={!!isValues.exam}
              onChange={(e) => setIsValues({ ...isValues, exam: true })}
            />

            <Checkbox
              label={{ title: "미응시" }}
              id="미응시"
              checked={!isValues.exam}
              onChange={(e) =>
                setIsValues({
                  ...isValues,
                  exam: false,
                  koelang: "",
                  math: "",
                  eng: "",
                  exploration1: " ",
                  exploration2: "",
                })
              }
            />
          </V.Row>
        </Input>

        {isValues.exam && (
          <V.Column
            gap={14}
            backgroundColor={colors.grey000}
            borderRadius={16}
            padding={{ all: 18 }}
          >
            <Txt color={colors.grey900}>
              {"이전 수능을 응시했다면\n각 과목 등급을 반드시 입력하세요!"}
            </Txt>
            <V.ScrollDragHorizontal gap={16}>
              {[
                { key: "국어", name: "koelang", value: isValues.koelang },
                { key: "수학", name: "math", value: isValues.math },
                { key: "영어", name: "eng", value: isValues.eng },
                {
                  key: "탐구1",
                  name: "exploration1",
                  value: isValues.exploration1,
                },
                {
                  key: "탐구2",
                  name: "exploration2",
                  value: isValues.exploration2,
                },
              ].map((item) => (
                <V.Column gap={6} key={item.key} width="auto">
                  <TxtSpan size={12}>{item.key}</TxtSpan>
                  <V.Container maxWidth={50} maxHeight={50}>
                    <Input.TextField
                      name={item?.name}
                      maxLength={1}
                      placeholder="-"
                      value={item.value}
                      css={{ textAlign: "center" }}
                      onChange={(e) => {
                        if (/^[0-9]*$/.test(e.target.value)) {
                          setIsValues({
                            ...isValues,
                            [e.target.name]: e.target.value,
                          });
                        }
                      }}
                    />
                  </V.Container>
                </V.Column>
              ))}
            </V.ScrollDragHorizontal>
          </V.Column>
        )}
      </V.Column>

      <Button
        type="button"
        width="100%"
        onClick={onStepNext}
        disabled={
          ((!isValues.fatherName || !isValues.fatherTel) &&
            (!isValues.motherName || !isValues.motherTel)) ||
          (!!isValues.fatherTel &&
            !regEx.phoneNumber.test(isValues.fatherTel)) ||
          (!!isValues.motherTel &&
            !regEx.phoneNumber.test(isValues.motherTel)) ||
          !(isValues.schoolYear && isValues.shcoolName) ||
          (!!isValues.exam &&
            (isValues.koelang === "" ||
              isValues.math === "" ||
              isValues.eng === "" ||
              isValues.exploration1 === "" ||
              isValues.exploration2 === ""))
        }
      >
        다음으로
      </Button>

      {/* 학교정보 바텀시트 */}
      <BottomSheet
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSearchSchool("");
          queryClient.removeQueries(["join-shcools"]);
        }}
      >
        <P.Sticky
          width="100%"
          zIndex={900}
          backgroundColor="#fff"
          position={{
            top: 0,
            left: 0,
            right: 0,
          }}
          padding={{ all: 16 }}
        >
          <Input.SearchField
            placeholder="학교를 검색하세요"
            value={searchSchool}
            onChange={(e) => {
              setSearchSchool(e.target.value);
              setPageSchool(1);
            }}
          />
        </P.Sticky>

        {isLoading ? (
          <>
            <Spacing size={30} />
            <LoadingSpinner />
          </>
        ) : (
          <>
            {schools?.count !== 0 ? (
              <V.Column
                gap={10}
                padding={{ top: 16, horizontal: 20, bottom: 30 }}
              >
                {schools?.results?.map((item: { name: string }, i: number) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      padding={{ vertical: 5 }}
                      onClick={() => {
                        setIsValues({ ...isValues, shcoolName: item.name });
                        setIsModalOpen(false);
                      }}
                    >
                      {item.name}
                    </TouchableOpacity>
                  );
                })}
              </V.Column>
            ) : (
              <V.Column align="center" padding={{ all: 30 }} gap={8}>
                <WarningIcon width="18px" fill={colors.grey400} />
                <Txt size={14} color={colors.grey500}>
                  해당 학교 정보가 존재하지 않습니다
                </Txt>
              </V.Column>
            )}
          </>
        )}

        <V.Column align="center" padding={{ bottom: 30 }}>
          <Pagination
            activePage={pageSchool}
            itemsCountPerPage={20}
            totalItemsCount={schools?.count}
            pageRangeDisplayed={4}
            hideFirstLastPages={true}
            hideNavigation={true}
            onChange={(pageNumber) => setPageSchool(pageNumber)}
          />
        </V.Column>
      </BottomSheet>
    </>
  );
}
