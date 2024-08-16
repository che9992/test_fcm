import React, { useState } from "react";

//style
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//module
import { Swiper, SwiperSlide } from "swiper/react";

//libs
import { V, Spacing, Txt, TxtSpan } from "@/_ui";
import { colors } from "@/libs/themes";

import { WarningIcon } from "@/libs/assets/icons";
import { HomeBox } from "@/pages";

//
export default function Event({ data }: { data: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <HomeBox>
      {data?.length === 0 ? (
        <V.Column align="center" gap={6}>
          <WarningIcon width={16} fill={colors.grey400} />
          <Txt txtAlign="center" color={colors.grey500} size={13}>
            현재 이벤트가 존재하지 않습니다
          </Txt>
        </V.Column>
      ) : (
        <>
          <Swiper
            style={{ width: "100%" }}
            onActiveIndexChange={(index) => setCurrentIndex(index.realIndex)}
            spaceBetween={16}
            loop={true}
          >
            {data?.map((item: any) => {
              return (
                <SwiperSlide
                  key={item?.id}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    cursor: "grab",
                  }}
                >
                  <TxtSpan size={14} color={colors.grey700}>
                    {item?.title}까지
                  </TxtSpan>
                  <Spacing size={4} />
                  <Txt as="h1" size={18} color={colors.keyColor}>
                    D &#45; {item?.d_day}일
                  </Txt>
                  <Spacing size={6} />
                  <TxtSpan size={14} color={colors.grey600}>
                    {item.date}
                  </TxtSpan>
                  <Spacing size={8} />
                  <TxtSpan color={colors.grey500}>
                    옆으로 밀어 다양한 일정을 확인하세요.
                  </TxtSpan>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <V.Row crossAlign="center" margin={{ top: 16 }} gap={4}>
            {data?.map((_: any, i: number) => {
              return (
                <div
                  css={{
                    width: 6,
                    height: 6,
                    backgroundColor: currentIndex === i ? "#1F7BDA" : "#CCCCCC",
                    borderRadius: 100,
                  }}
                  key={i}
                />
              );
            })}
          </V.Row>
        </>
      )}
    </HomeBox>
  );
}
