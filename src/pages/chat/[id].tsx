import dynamic from "next/dynamic";

//lib
import { V } from "@/_ui";

//components
const ChatRoom = dynamic(import("@/app/chat/components/_index/ChatRoom"), {
  ssr: false,
});

export default function Index() {
  return (
    <>
      <V.Section backgroundColor="#f8f9fc">
        <ChatRoom />
      </V.Section>
    </>
  );
}

Index.auth = true;
