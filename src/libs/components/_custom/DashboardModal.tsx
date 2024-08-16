/** @jsxImportSource @emotion/react */
import React, { ReactNode, useEffect, useRef, HTMLAttributes } from "react";

import { Modal, V } from "@/_ui";

// --------------------------------------------
// -------------- Type Interface --------------
// --------------------------------------------
interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  view: boolean;
  onCancel: () => void;
}

// ------------------------------------
// -------------- Dialog --------------
// ------------------------------------
export function DashboardModal({ children, view, onCancel, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflowY = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflowY = "auto";

      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [view]);

  return (
    <>
      <Modal open={view} onCancel={onCancel}>
        <V.Column ref={ref} {...props}>
          {children}
        </V.Column>
      </Modal>
    </>
  );
}

// ----------------------------------
// -------------- Icon --------------
// ----------------------------------
function CancelIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 26 26"
    >
      <path
        id="xIcon"
        d="M26.334,7.95a13,13,0,1,0,0,18.384,13,13,0,0,0,0-18.384M19.761,21.286l-2.619-2.619-2.621,2.621A1.079,1.079,0,0,1,13,19.761l2.621-2.621L13,14.525A1.079,1.079,0,0,1,14.526,13l2.616,2.617L19.758,13a1.076,1.076,0,0,1,1.522,1.522l-2.616,2.616,2.621,2.619-.23.23.23-.23a1.079,1.079,0,0,1-1.526,1.526"
        transform="translate(-4.141 -4.142)"
        fill="#e0e0e0"
      />
    </svg>
  );
}
