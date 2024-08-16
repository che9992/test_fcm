import { CLOUDINARY_KEY, CLOUDINARY_URL } from "@/config/env_key";
import axios from "axios";
import React, { useState } from "react";

export default function useCloudiReader({
  handleOnState,
}: {
  handleOnState: (imgUrl: string, fileName?: any) => void;
}) {
  const [status, setIsStatus] = useState<boolean | "loading" | "error">(false);

  const uploadImageReader = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsStatus("loading");

    // e.target 또는 e.target.files가 undefined인지 확인
    if (e?.target?.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", CLOUDINARY_KEY);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        const cloudURL = response?.data?.secure_url;

        if (cloudURL) {
          handleOnState(cloudURL, file.name);
          setIsStatus(false);

          console.log("Image uploaded to Cloudflare:");
        } else {
          setIsStatus("error");
          console.error("Cloudflare upload URL not found in the response");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  return { uploadImageReader, status };
}
