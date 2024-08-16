export const getSortedChatUsers = ({
  chat_users,
  initiator,
}: {
  chat_users: any;
  initiator: any;
}) => {
  return chat_users
    ? [...chat_users].sort((a: any, b: any) => {
        // initiator(방장) a인 경우 -1을 반환하여 a가 b보다 앞에 오도록 합니다.
        if (initiator?.id === a?.id) return -1;
        if (initiator?.id === b?.id) return 1;

        // category가 '선생님'인 경우 -1을 반환하여 a가 b보다 앞에 오도록 합니다.
        if (a?.category === "선생님") return -1;
        if (b?.category === "선생님") return 1;

        // category가 '학생'인 경우 -1을 반환하여 a가 b보다 앞에 오도록 합니다.
        if (a?.category === "학생") return -1;
        if (b?.category === "학생") return 1;

        // category가 '학부모'인 경우 -1을 반환하여 a가 b보다 앞에 오도록 합니다.
        if (a?.category === "학부모") return -1;
        if (b?.category === "학부모") return 1;

        return 0;
      })
    : [];
};
