//libs
import { Button, Calendar, Select, Txt, V } from "@/_ui";
import { colors } from "@/libs/themes/colors";

//atom
import { joinFieldAtom } from "@/app/joinUs/atoms/join-field-atom";
import { useRecoilState } from "recoil";

//hooks
import { useMoment } from "@/libs/hooks";

//
export default function JoinStep3({
  options,
  onStepNext,
}: {
  options: any;
  onStepNext: () => void;
}) {
  const [isValues, setIsValues] = useRecoilState(joinFieldAtom);
  const {
    korlangSubject,
    mathSubject,
    exploration1Subject,
    exploration2Subject,
    korlangCounsel,
    mathCounsel,
    engCounsel,
    starting,
  } = isValues;

  return (
    <>
      <V.Column gap={50}>
        <V.Column gap={20}>
          <Select
            label="국어"
            important="*"
            placeholder="국어 과목 선택"
            value={isValues.korlangSubject}
            onChange={(e) =>
              setIsValues({ ...isValues, korlangSubject: e.target.value })
            }
            options={options?.korean_choices}
            renderItem={(item) => (
              <Select.Option key={item?.value} value={item.value}>
                {item.display_name}
              </Select.Option>
            )}
          />

          <Select
            label="수학"
            important="*"
            placeholder="수학 과목 선택"
            value={isValues.mathSubject}
            onChange={(e) =>
              setIsValues({ ...isValues, mathSubject: e.target.value })
            }
            options={options?.math_choices}
            renderItem={(item) => (
              <Select.Option key={item?.value} value={item.value}>
                {item.display_name}
              </Select.Option>
            )}
          />

          <Select
            label="탐구1"
            important="*"
            placeholder="탐구1 과목 선택"
            value={isValues.exploration1Subject}
            onChange={(e) =>
              setIsValues({
                ...isValues,
                exploration1Subject: e.target.value,
              })
            }
            options={options?.subject_choices}
            renderItem={(item) => (
              <Select.Option key={item?.value} value={item.value}>
                {item.display_name}
              </Select.Option>
            )}
            error={{
              error:
                !!isValues.exploration1Subject &&
                isValues.exploration1Subject === isValues.exploration2Subject,
              message: "탐구 과목은 중복선택이 불가합니다",
            }}
          />

          <Select
            label="탐구2"
            important="*"
            placeholder="탐구2 과목 선택"
            value={isValues.exploration2Subject}
            onChange={(e) =>
              setIsValues({
                ...isValues,
                exploration2Subject: e.target.value,
              })
            }
            options={options?.subject_choices}
            error={{
              error:
                !!isValues.exploration2Subject &&
                isValues.exploration1Subject === isValues.exploration2Subject,
              message: "탐구 과목은 중복선택이 불가합니다",
            }}
            renderItem={(item) => (
              <Select.Option key={item?.value} value={item.value}>
                {item.display_name}
              </Select.Option>
            )}
          />
        </V.Column>

        <V.Column gap={20}>
          <V.Column gap={8} margin={{ bottom: 8 }}>
            <Txt size={18} as="h2">
              {"각 주기의 과목별 선생님께서\n 직접 안내드려요"}
            </Txt>

            <Txt css={{ color: colors.grey700 }}>
              희망 상담주기는 이후에도 변경이 가능해요
            </Txt>
          </V.Column>

          <Select
            label="국어 상담주기"
            important="*"
            placeholder="국어 상담주기 선택"
            value={isValues.korlangCounsel}
            onChange={(e) =>
              setIsValues({ ...isValues, korlangCounsel: e.target.value })
            }
            options={choice}
            renderItem={(item) => (
              <Select.Option key={item?.value} value={item.value}>
                {item.display_name}
              </Select.Option>
            )}
          />

          <Select
            label="수학 상담주기"
            important="*"
            placeholder="수학 상담주기 선택"
            value={isValues.mathCounsel}
            onChange={(e) =>
              setIsValues({ ...isValues, mathCounsel: e.target.value })
            }
            options={choice}
            renderItem={(item) => (
              <Select.Option key={item?.value} value={item.value}>
                {item.display_name}
              </Select.Option>
            )}
          />

          <Select
            label="영어 상담주기"
            important="*"
            placeholder="영어 상담주기 선택"
            value={isValues.engCounsel}
            onChange={(e) =>
              setIsValues({ ...isValues, engCounsel: e.target.value })
            }
            options={choice}
            renderItem={(item) => (
              <Select.Option key={item?.value} value={item.value}>
                {item.display_name}
              </Select.Option>
            )}
          />

          <V.Column gap={10}>
            <Txt size={13} color="#888">
              입소일{" "}
              {isValues.starting &&
                " : " + useMoment(isValues.starting).format("yyyy.mm.dd")}
            </Txt>

            <V.Column
              backgroundColor="#f8f8f8"
              padding={{ vertical: 10 }}
              borderRadius={12}
            >
              <Calendar
                date={isValues.starting as any}
                onClick={(date: any) =>
                  setIsValues({ ...isValues, starting: date })
                }
              />
            </V.Column>
          </V.Column>
        </V.Column>
      </V.Column>

      <Button
        type="button"
        width="100%"
        onClick={onStepNext}
        disabled={
          !(
            korlangSubject &&
            mathSubject &&
            exploration1Subject &&
            exploration2Subject &&
            korlangCounsel &&
            mathCounsel &&
            engCounsel &&
            starting
          )
        }
      >
        다음으로
      </Button>
    </>
  );
}

const choice = [
  { value: 0, display_name: "제가 필요할 때 찾아갈게요" },
  { value: 7, display_name: "일주일에 한번" },
  { value: 14, display_name: "2주에 한번" },
  { value: 30, display_name: "한달에 한번" },
];
