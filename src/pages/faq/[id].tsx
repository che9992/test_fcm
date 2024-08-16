import { useCore } from "@/libs/provider/useCore";
import {
  useState,
  useMoment,
  useTanstackQuery,
  useFileDownload,
} from "@/libs/hooks";

//apis
import { getDetailFaq } from "@/app/faq/apis/getDetailFaq";
import { removeFaq } from "@/app/faq/apis/removeFaq";

//libs
import { Dialog, Txt, TxtSpan, V, Image, TxtTab, Divider } from "@/_ui";
import { colors } from "@/libs/themes";

//atoms
import { useSetRecoilState } from "recoil";
import { alartAtom } from "@/app/_layout/atoms/widgets-atom";

//components
import View from "@/app/_layout/components/View";
import { FileItems } from "@/libs/components/_custom/FileItems";

//
export default function Detail() {
  const { axiosInstance, router } = useCore();
  const { queryKey, useQuery, useMutation } = useTanstackQuery();
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const setIsAlart = useSetRecoilState(alartAtom);

  const [inquiryImages, setInquiryImages] = useState([]);
  const [answerImages, setAnswerImages] = useState([]);

  //
  //// 상세 데이터
  const { isLoading, data } = useQuery(
    [queryKey.문의하기.상세, router.query.id],
    () => getDetailFaq({ axiosInstance, id: router.query.id }),
    {
      onSuccess: (data) => {
        if (data?.answer_files) {
          const filteredImages = data.answer_files
            .flat()
            .filter((file: any) => {
              const fileExtension = file.file.split(".").pop().toLowerCase();
              return (
                fileExtension === "jpg" ||
                fileExtension === "png" ||
                fileExtension === "jpeg"
              );
            });
          setAnswerImages(filteredImages);
        }

        if (data?.inquiry_files) {
          const filteredImages = data.inquiry_files
            .flat()
            .filter((file: any) => {
              const fileExtension = file.file.split(".").pop().toLowerCase();
              return (
                fileExtension === "jpg" ||
                fileExtension === "png" ||
                fileExtension === "jpeg"
              );
            });
          setInquiryImages(filteredImages);
        }
      },
      refetchOnWindowFocus: false,
      enabled: !!router.query.id,
    }
  );

  //
  /// 삭제하기
  const { mutate: onRemove } = useMutation(
    () => removeFaq({ axiosInstance, id: router.query.id }),
    {
      onSuccess: (data) => {
        router.back();
        setIsAlart(true);
      },
    }
  );

  return (
    <View
      appTitle={`${
        data?.inquiry?.learning_question ? "학과" : "생활"
      } 문의 상세`}
      backEvent={() => router.back()}
      loading={isLoading}
      navigator={false}
      backgroundColor="#f8f9fc"
      borderBottom="1px solid #eee"
    >
      <V.Column
        maxWidth={600}
        gap={16}
        padding={{ top: 30, bottom: 40 }}
        backgroundColor="#fff"
        height="100%"
        flex={1}
      >
        <V.Column padding={{ horizontal: 20 }}>
          <Txt size={18} as="strong">
            ({data?.inquiry.category}) {data?.inquiry.title}
          </Txt>

          <TxtSpan size={13} padding={{ top: 8, bottom: 20 }}>
            {data?.inquiry?.updated_at
              ? `${useMoment(data?.inquiry.updated_at).format(
                  "yyyy.mm.dd"
                )} 수정`
              : `${useMoment(data?.inquiry.created_at).format(
                  "yyyy.mm.dd"
                )} 등록`}
            ˙ {data?.inquiry.status}
          </TxtSpan>

          <Txt> {data?.inquiry?.content}</Txt>

          {inquiryImages?.length !== 0 && (
            <V.Column gap={20} margin={{ top: 24 }}>
              {inquiryImages?.map((item: any) => (
                <Image source={item?.file} alt={item?.title} zoomUp />
              ))}
            </V.Column>
          )}

          {data?.inquiry_files.length > 0 && (
            <V.Column margin={{ top: 24 }} gap={8}>
              <TxtSpan size={12} color="#aaa">
                첨부 파일
              </TxtSpan>

              <V.Column gap={6}>
                {data?.inquiry_files?.map((item: any) => {
                  return (
                    <FileItems
                      key={item?.file}
                      onClick={() =>
                        useFileDownload({
                          file: item?.file,
                          title: item?.title,
                        })
                      }
                    >
                      {item?.title}
                    </FileItems>
                  );
                })}
              </V.Column>
            </V.Column>
          )}

          {data?.inquiry?.is_editable && (
            <V.Row
              gap={12}
              margin={{ top: 16 }}
              crossAlign="end"
              padding={{ horizontal: 6 }}
            >
              <TxtTab
                padding={{ all: 4 }}
                color={colors.grey500}
                onClick={() =>
                  router.push({
                    pathname: data?.inquiry?.learning_question
                      ? "/faq/create-study"
                      : "/faq/create-life",
                    query: { id: router.query.id },
                  })
                }
              >
                수정
              </TxtTab>
              <TxtTab
                padding={{ all: 4 }}
                color={colors.grey500}
                onClick={() => setIsDeleteDialog(true)}
              >
                삭제
              </TxtTab>
            </V.Row>
          )}
        </V.Column>

        {!!data?.inquiry.prefer && (
          <V.Column padding={{ top: 20, horizontal: 20 }}>
            <V.Column
              align="center"
              padding={{ all: 16 }}
              backgroundColor={colors.ground200}
              borderRadius={14}
            >
              <TxtSpan size={14} color={colors.keyColor}>
                {data?.inquiry.prefer}을 희망합니다
              </TxtSpan>
            </V.Column>
          </V.Column>
        )}

        {!!data?.answer && Object?.keys(data?.answer)?.length !== 0 ? (
          <>
            <Divider size={10} color="#f8f8f8" spacing={{ vertical: 20 }} />
            <V.Column padding={{ horizontal: 20 }}>
              <Txt size={18} as="strong">
                답변내용
              </Txt>

              <V.Row
                padding={{ top: 8, bottom: 20 }}
                gap={20}
                crossGap={3}
                wrap="wrap"
              >
                <Txt size={13}>작성자 : {data?.answer.teacher?.username}</Txt>
                <Txt size={13} color="#797979">
                  답변일 :{" "}
                  {useMoment(data?.answer.created_at).format("yyyy.mm.dd")}{" "}
                  {data?.answer.updated_at &&
                    `| 수정일 : ${useMoment(data?.answer.updated_at).format(
                      "yyyy.mm.dd"
                    )}`}
                </Txt>
              </V.Row>

              <Txt>{data?.answer.content}</Txt>

              {answerImages?.length !== 0 && (
                <V.Column gap={20} margin={{ top: 24 }}>
                  {answerImages?.map((item: any) => (
                    <Image source={item?.file} alt={item?.title} zoomUp />
                  ))}
                </V.Column>
              )}

              {data?.answer_files.length > 0 && (
                <V.Column margin={{ top: 24 }} gap={8}>
                  <TxtSpan size={12} color="#9a9a9a">
                    첨부 파일
                  </TxtSpan>

                  <V.Column gap={6}>
                    {data?.answer_files?.map((item: any) => {
                      return (
                        <FileItems
                          key={item?.file}
                          onClick={() =>
                            useFileDownload({
                              file: item?.file,
                              title: item?.title,
                            })
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
          </>
        ) : (
          <V.Column padding={{ horizontal: 20 }}>
            <V.Column
              padding={{ all: 18 }}
              align="center"
              backgroundColor="#f8f8f8"
              borderRadius={14}
            >
              <TxtSpan size={14} color="#999">
                현재 답변이 존재하지 않습니다
              </TxtSpan>
            </V.Column>
          </V.Column>
        )}
      </V.Column>

      <Dialog
        title="삭제 하시겠습니까?"
        description={`한번 삭제된 내용은 \n복구가 불가합니다.`}
        open={isDeleteDialog}
        onCancel={() => setIsDeleteDialog(false)}
        tabs={[{ name: "삭제하기", onClick: () => onRemove() }]}
      />
    </View>
  );
}

Detail.auth = true;
