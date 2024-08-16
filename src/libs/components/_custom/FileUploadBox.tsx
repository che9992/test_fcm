import React, { InputHTMLAttributes } from "react";
import { V, TxtSpan } from "@/_ui";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  accept?: any;
  disabled?: boolean;
}

export function FileUploadBox({
  disabled,
  accept = "image/jpg, image/jpeg, image/png , image/jfif , .pdf , .webp",
  ...props
}: Props) {
  return (
    <V.Column
      width="auto"
      padding={{ vertical: 11, horizontal: 16 }}
      backgroundColor="#f0f5fd"
      borderRadius={12}
      css={{
        opacity: disabled ? 0.55 : undefined,
      }}
    >
      <input
        disabled={disabled}
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 888,
          opacity: 0,
          cursor: "pointer !important",

          "&:disabled": {
            cursor: "default",
          },
        }}
        type="file"
        accept={accept}
        {...props}
      />
      <TxtSpan
        size={14}
        color="#67a8ff"
        css={{ cursor: disabled ? "default !important" : "pointer !important" }}
      >
        파일 업로드
      </TxtSpan>
    </V.Column>
  );
}
