import { saveAs } from "file-saver";

//
/// 파일다운로드
function useFileDownload(file: { title: string; file: string }) {
  return fetch(file.file)
    .then((response) => response.blob())
    .then((blob) => {
      const fileName = file.title; // 파일명을 file.title로 설정
      saveAs(blob, fileName);
    });
}

export { useFileDownload };
