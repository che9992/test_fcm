import {
  useTanstackQuery,
  useCallback,
  useEffect,
  useState,
} from "@/libs/hooks";
import { useCore } from "@/libs/provider/useCore";

//libs
import { V } from "@/_ui";

//components
import { AppBar } from "@/app/chat/components/create/AppBar";
import { Step1 } from "@/app/chat/components/create/Step1";
import { Step2 } from "@/app/chat/components/create/Step2";

//apis
import { createChatRoom } from "@/app/chat/apis/createChatRoom";

//
export default function Create() {
  const { axiosInstance, router } = useCore();
  const { useMutation } = useTanstackQuery();

  const { step } = router.query ?? {};
  const [teacher, setTeacher] = useState(null);

  const handleAddTeacher = useCallback(
    (data: any) => setTeacher(data),
    [teacher]
  );

  useEffect(() => {
    if (router.query.category !== "") setTeacher(null);
    if (router.query.step === "1" || !router.query.step) setTeacher(null);
  }, [teacher, router.query]);

  const { mutate: onCreate } = useMutation({
    mutationFn: () =>
      createChatRoom({
        axiosInstance,
        teacher,
        category: router.query.category,
      }),
    onSuccess: (data) => {
      router.replace("/chat/" + data?.id);
    },
  });

  return (
    <V.Section backgroundColor="#f8f9fc">
      <V.Column
        flex={1}
        height="100%"
        minHeight="100vh"
        backgroundColor="#fff"
        maxWidth={500}
      >
        <AppBar onCreate={onCreate} />

        <V.Column padding={{ top: 60 }}>
          {step === "2" ? (
            <Step2 teacher={teacher} handleAddTeacher={handleAddTeacher} />
          ) : (
            <Step1 />
          )}
        </V.Column>
      </V.Column>
    </V.Section>
  );
}

Create.auth = true;
