import { ReactNode, useEffect } from "react";
import { JengaProvider } from "@/_ui/JengaProvider";
import { Global, css } from "@emotion/react";

//
//
export function GlobalThemes({
  children,
}: {
  children?: ReactNode;
}): JSX.Element {
  //
  // 웹뷰, pwa 터치 스와이프 무효화
  useEffect(() => {
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) =>
      (touchStartX = e.touches[0].clientX);

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX < 25) e.preventDefault();
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

          * {
            box-sizing: border-box;
            text-decoration: none;
            list-style: none;
            margin: 0;
            padding: 0;
            font-family: "Noto Sans KR", sans-serif;
            user-select: auto;
            -webkit-touch-callout: none;
            -webkit-text-size-adjust: auto;
          }

          html {
            margin: 0;
            padding: 0;
          }

          body {
            display: block;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            text-rendering: optimizeLegibility;
            overflow-x: hidden;
            overflow-y: auto;
            word-break: break-all;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }

          @supports (-webkit-touch-callout: none) {
            html,
            body,
            #layout {
              height: -webkit-fill-available;
            }
          }

          strong,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p {
            margin: 0;
            padding: 0;
          }

          a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #4e4e51;
            cursor: pointer;
            white-space: nowrap;
            transition: 0.3s ease-in-out;
          }

          ul,
          li {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
          }

          button {
            display: flex;
            background-color: transparent;
            outline: none;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            width: auto;
            color: #4e4e51;
            transition: all 0.3s ease-in-out;
          }

          svg,
          img,
          picture {
            transition: all 0.3s ease-in-out;
          }

          /* Custom Scrollbar Styles */
          ::-webkit-scrollbar {
            width: 8px;
            height: 6px;
          }
          ::-webkit-scrollbar-track {
            background-color: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #999;
            border-radius: 100px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #e2e2e2;
          }

          /* Input Styles */
          input,
          textarea,
          select {
            border: none;
            outline: none;
            text-decoration: none;
            background-color: transparent;
            resize: none;
          }

          input[type="checkbox"],
          input[type="radio"] {
            cursor: pointer;
          }

          select {
            -webkit-appearance: none;
            appearance: none;
            cursor: pointer;
          }

          select::-ms-expand {
            display: none;
          }

          input::-webkit-search-decoration,
          input::-webkit-search-cancel-button,
          input::-webkit-search-results-button,
          input::-webkit-search-results-decoration {
            display: none;
          }

          .react-datepicker-wrapper {
            width: 100%;
          }

          /* react-datepicker */
          .react-datepicker-wrapper {
            width: 100%;
          }

          /* swiper-dots */
          .swiper-pagination-bullets {
            margin-bottom: 6px;
          }

          .pagination {
            display: flex;
            justify-content: center;
            margin-top: 15px;
          }

          ul {
            list-style: none;
            padding: 0;

            display: flex;
            column-gap: 10px;
          }

          ul.pagination li {
            display: inline-block;
            width: 26px;
            height: 26px;
            border-radius: 9px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
          }

          ul.pagination li:hover {
            background-color: #f8f8f8;
            color: #1f7bda;
            cursor: pointer;
          }

          ul.pagination li:first-child {
            border-radius: 9px;
          }

          ul.pagination li:last-child {
            border-radius: 9px;
          }

          ul.pagination li a {
            text-decoration: none;
            color: #555;
            font-size: 12px;
          }

          ul.pagination li.active a {
            color: white;
          }

          ul.pagination li.active {
            background-color: #1f7bda;
          }

          .page-selection {
            width: 48px;
            height: 30px;
            color: #1f7bda;
          }
        `}
      />

      <JengaProvider>{children}</JengaProvider>
    </>
  );
}
