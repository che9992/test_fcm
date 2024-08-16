import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect } from 'react';
import { useRecoilState } from 'recoil';
import { atom } from 'recoil';

// atoms
export const scrollPositionAtom = atom<number>({
  key: 'scrollPosition',
  default: 0,
});

// 현재 스크롤 포지션을 기억하는 hooks
export const useScrollPosition = ({
  position,
  handler,
}: {
  position: number;
  handler: (offset: number) => void;
}) => {
  const [scrollPosition, setScrollPosition] = useRecoilState(scrollPositionAtom);
  const router = useRouter();

  // 이벤트 리스너에서 window.pageYOffset 값을 직접 가져와서 핸들러에 전달

  const onScroll = () => {
    handler(window.pageYOffset);
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      setScrollPosition(position);
    };
  }, [position]);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, []);
};
