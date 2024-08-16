import React, { ChangeEvent } from 'react';

interface Props {
  e: ChangeEvent<HTMLInputElement>;
  currentFilesLength: number;
}

export function useFilesUpload({
  e,
  currentFilesLength,
}: Props): Promise<{ title: string; file: string }[]> {
  const reader = new FileReader();
  const newFiles = Array.from(e.target.files || []) as File[];

  if (currentFilesLength + newFiles.length > 3) {
    return Promise.reject('Too many files');
  }

  const promises = newFiles.map((file) => {
    return new Promise<string>((resolve) => {
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
    });
  });

  return Promise.all(promises).then((images) => {
    return images.map((image, index) => ({
      title: newFiles[index].name,
      file: image,
    }));
  });
}
