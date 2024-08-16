import { atom } from 'recoil';

// 스넥바
export const snackbarAtom = atom<boolean>({
  key: 'snackbar',
  default: false,
});

// alalrt
export const alartAtom = atom<boolean>({
  key: 'snackbar-alart-atom',
  default: false,
});

// alart 내용
export const alartContextAtom = atom<{ title: string; context: string }>({
  key: 'snackbar-context-atom',
  default: { title: '', context: '' },
});

// 로딩
export const loadingAtom = atom<boolean>({
  key: 'loading-atom',
  default: false,
});

// 뒤로가기 버튼
export const backRouteAtom = atom<boolean>({
  key: 'back-router-atom',
  default: false,
});

// 삭제 버튼
export const deleteOpenAtom = atom<boolean>({
  key: 'delete-open-atom',
  default: false,
});
