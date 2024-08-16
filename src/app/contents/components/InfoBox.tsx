//libs
import { V, Txt, TxtSpan } from "@/_ui";
import { MQ } from "@/libs/themes";

//service
import service from "public/service.json";

export default function InfoBox() {
  return (
    <V.Column
      align="start"
      gap={24}
      padding={{ all: 30 }}
      margin={{ top: 20 }}
      borderRadius={16}
      shadow={{ x: 0, y: 2, blur: 20, color: "#e9e9e9" }}
      css={{
        [MQ[2]]: {
          boxShadow: "none",
          padding: "40px 20px 30px",
          borderTop: "10px solid #f2f2f2",
          marginTop: 30,
          borderRadius: 0,
        },
      }}
    >
      {[
        {
          title: "반품/교환 방법",
          context: "콘텐츠 > 구매목록 > 결제취소 또는 학원 행정실 문의",
        },
        {
          title: "반품/교환가능 기간",
          context:
            "변심반품의 경우 수령 후 7일 이내,\n 상품의 결함 및 계약내용과 다를 경우 문제점 발견 후 30일 이내",
        },
        {
          title: "반품/교환비용",
          context: "변심 혹은 구매착오로 인한 반품/교환은 반송료 고객 부담",
        },
        {
          title: "반품/교환 불가 사유",
          contexts: [
            {
              t: "1) 소비자의 책임 있는 사유로 상품 등이 손실 또는 훼손된 경우",
              s: "(단지 확인을 위한 포장 훼손은 제외)",
            },
            {
              t: "2) 소비자의 사용, 포장 개봉에 의해 상품 등의 가치가 현저히 감소한 경우",
              s: "예) 화장품, 식품, 가전제품(악세서리 포함) 등",
            },
            {
              t: "3) 복제가 가능한 상품 등의 포장을 훼손한 경우",
              s: "예) 음반/DVD/비디오, 소프트웨어, 만화책, 잡지, 영상 화보집",
            },
            {
              t: "4) 소비자의 요청에 따라 개별적으로 주문 제작되는 상품의 경우 ((1)해외주문도서)",
            },
            {
              t: "5) 디지털 컨텐츠인 eBook, 오디오북 등을 1회 이상 다운로드를 받았을 경우",
            },
            {
              t: "6) 시간의 경과에 의해 재판매가 곤란한 정도로 가치가 현저히 감소한 경우",
            },
            {
              t: "7) 전자상거래 등에서의 소비자보호에 관한 법률이 정하는 소비자 청약철회 제한 내용에 해 당되는 경우",
            },
            {
              t: "8) 세트상품 일부만 반품 불가 (필요시 세트상품 반품 후 낱권 재구매)",
            },
          ],
        },
      ].map((item: any, i: number) => (
        <V.Column key={i} gap={8}>
          <TxtSpan size={16} color="#333" weight="medium">
            {item?.title}
          </TxtSpan>
          <Txt size={14} color="#797979">
            {item?.context}
          </Txt>

          <V.Column gap={12}>
            {item?.contexts?.map((item: any) => (
              <V.Column gap={4}>
                <Txt size={14} color="#797979">
                  {item?.t}
                </Txt>
                <Txt size={12} color="#aaa">
                  {item?.s}
                </Txt>
              </V.Column>
            ))}
          </V.Column>
        </V.Column>
      ))}

      <V.Column gap={4} margin={{ top: 10 }}>
        <Txt size={13} weight="medium" color="#666">
          {service.componey}
        </Txt>
        <TxtSpan size={12} color="#888" margin={{ top: 8 }}>
          대표 : {service.componeyBoss} | 사업자주소 : {service.componeyAddress}
        </TxtSpan>
        <Txt size={12} color="#888">
          대표번호 : {service.componeyTel} | 사업자번호:{" "}
          {service.componeyNumber} | 통신판매번호:
          {service.componeyStoreNumber}
        </Txt>
      </V.Column>
    </V.Column>
  );
}
