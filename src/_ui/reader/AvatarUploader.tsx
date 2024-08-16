/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, useRef } from "react";
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { V } from "@/_ui";

interface Props {
  theme?: "light" | "dark";
  onUpload: (e: any) => void;
  onCancel: () => void;
  loading?: boolean;
  source: string;
  alt?: string;
  size?: number;
  borderRadius?: number;
  backgroundColor?: string;
}

//
export function AvatarUploader(props: Props) {
  const { source, alt, onUpload, onCancel } = props;
  const { theme = "light", size = 100, loading } = props;
  const { backgroundColor, borderRadius = 10000 } = props;

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0])
      encodeFileToBase64(e.dataTransfer.files[0]);
  };

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => onUpload(reader.result);
    reader.onerror = (error) => console.error("File reading error:", error);
  };

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0])
      encodeFileToBase64(e.target.files[0]);
  };

  const VARIANTS = {
    light: {
      readBg: "#f5f5f5",
      cancelColor: "#ffffff",
      cancelTabColor: "#cccccc",
    },
    dark: {
      readBg: "#333",
      cancelColor: "#151515",
      cancelTabColor: "#666",
    },
  } as const;

  return (
    <V.Container
      maxWidth={size}
      minWidth={size}
      maxHeight={size}
      minHeight={size}
      css={{ cursor: "pointer", userSelect: "none" }}
    >
      {source ? (
        <>
          <img
            src={source}
            alt={alt}
            loading="lazy"
            onClick={() => uploadRef.current?.click()}
            css={{
              borderRadius: borderRadius,
              minWidth: `${size}px`,
              minHeight: `${size}px`,
              maxWidth: `${size}px`,
              maxHeight: `${size}px`,
              objectFit: "cover",
            }}
          />
          {!!onCancel && (
            <button
              type="button"
              onClick={onCancel}
              css={{
                ...themes.button,
                backgroundColor: VARIANTS[theme].cancelColor,
              }}
            >
              <CancelIcon fill={VARIANTS[theme].cancelTabColor} />
            </button>
          )}
        </>
      ) : (
        <V.Container
          maxWidth={size}
          minWidth={size}
          maxHeight={size}
          minHeight={size}
          backgroundColor={backgroundColor ?? VARIANTS[theme].readBg}
          borderRadius={borderRadius}
          crossAlign="center"
          align="center"
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <CameraIcon size={size} fill={VARIANTS[theme].cancelTabColor} />
          )}
        </V.Container>
      )}

      <input
        ref={uploadRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleOnUpload}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        css={themes.input}
      />
    </V.Container>
  );
}

// -----------------------------------
// -------------- Icons --------------
// -----------------------------------
const CameraIcon = ({ size, fill }: { size: number; fill: string }) => {
  return (
    <svg
      width={`${size / 3}px`}
      id="carmera-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 46 36.8"
    >
      <path
        id="패스_16850"
        data-name="패스 16850"
        d="M30.419,24.81A7.419,7.419,0,1,1,23,17.521,7.363,7.363,0,0,1,30.419,24.81ZM46,14.46v20.7a5.043,5.043,0,0,1-5.087,5H5.087a5.043,5.043,0,0,1-5.087-5V14.46a5.043,5.043,0,0,1,5.087-5h6.256V7.733A4.412,4.412,0,0,1,15.794,3.36H30.206a4.412,4.412,0,0,1,4.451,4.373V9.461h6.256A5.045,5.045,0,0,1,46,14.46ZM34.234,24.81A11.235,11.235,0,1,0,23,35.847,11.149,11.149,0,0,0,34.234,24.81Z"
        transform="translate(0 -3.36)"
        fill={fill}
      />
    </svg>
  );
};

const CancelIcon = ({ fill }: { fill: string }) => {
  return (
    <svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
      <path
        id="xIcon"
        d="M26.334,7.95a13,13,0,1,0,0,18.384,13,13,0,0,0,0-18.384M19.761,21.286l-2.619-2.619-2.621,2.621A1.079,1.079,0,0,1,13,19.761l2.621-2.621L13,14.525A1.079,1.079,0,0,1,14.526,13l2.616,2.617L19.758,13a1.076,1.076,0,0,1,1.522,1.522l-2.616,2.616,2.621,2.619-.23.23.23-.23a1.079,1.079,0,0,1-1.526,1.526"
        transform="translate(-4.141 -4.142)"
        fill={fill}
      />
    </svg>
  );
};

const themes: any = {
  button: {
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 10,
    maxWidth: 28,
    minWidth: 28,
    maxHeight: 28,
    minHeight: 28,
  },

  input: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: "0",
    cursor: "pointer",
  },
};
