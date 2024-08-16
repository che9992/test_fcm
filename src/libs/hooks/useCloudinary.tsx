import React from 'react';
import axios from 'axios';
import { CLOUDINARY_KEY, CLOUDINARY_URL } from '../../../public/config/env_key';

interface Props {
  image: string;
}

interface UploadProps {
  images: string[];
}

const isBase64Image = (img: string) => {
  const base64Regex = /^data:image\/([a-z]+);base64,/;
  return base64Regex.test(img);
};

const isCloudinaryUrl = (img: string) => {
  const cloudinaryRegex = /^https?:\/\/res.cloudinary.com\/[^\s/]+\/image\/upload\//;
  return cloudinaryRegex.test(img);
};

const isBase64 = (data: string) => {
  const base64Regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*$/;
  return base64Regex.test(data);
};

const getResourceType = (data: string) => {
  const match = data.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*$/);
  if (match && match[1]) {
    const type = match[1].split('/')[0];
    if (type === 'image') return 'image';
    if (type === 'video') return 'video';
    if (type === 'application') return 'raw'; // For PDFs and other files.
  }
  return 'image'; // Default to image
};

//
/// 업로드 > 프로필 이미지
export function uploadProfileImgCloudinary({ image }: Props) {
  const formData = new FormData();

  if (isBase64Image(image)) {
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_KEY);
    return axios.post(CLOUDINARY_URL, formData);
  } else if (isCloudinaryUrl(image)) {
    return Promise.resolve({ data: { secure_url: image } });
  }
  return Promise.reject('Invalid image format');
}

//
/// 업로드 > 여러 파일
export function uploadFilesCloudinary({ images }: UploadProps): Promise<string[]> {
  const uploadFile = (data: string) => {
    // If it is not already a Cloudinary URL or Base64 format, return the URL immediately.
    if (isCloudinaryUrl(data)) return Promise.resolve(data);

    if (isBase64(data)) {
      const formData = new FormData();
      formData.append('file', data);
      formData.append('upload_preset', CLOUDINARY_KEY);
      const resourceType = getResourceType(data);
      return axios.post(CLOUDINARY_URL, formData).then((response) => response.data.secure_url);
    }

    // Raise an error if the format is not Cloudinary URL or Base64
    return Promise.reject('Invalid file format');
  };

  return Promise.all(images.map((data) => uploadFile(data)));
}
