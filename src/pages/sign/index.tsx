import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  const path = context.req.url;
  const fullUrl = `${protocol}://${host}${path}`;

  const userAgent = context.req.headers["user-agent"] || "";

  if (userAgent.includes("KAKAOTALK")) {
    return {
      redirect: {
        destination: `kakaotalk://web/openExternal?url=${encodeURIComponent(
          fullUrl
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sign/login");
  }, []);
}

Index.auth = false;
