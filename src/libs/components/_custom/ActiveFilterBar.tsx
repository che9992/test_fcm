import { useRouter } from "next/router";

//libs
import { TouchableOpacity, Txt, TxtSpan, V } from "@/_ui";
import { CancelIcon } from "@/libs/assets/icon-fill";

//
const ActiveFilterBar = ({
  filters,
  padding,
}: {
  filters?: {
    name: any;
    onClick: () => void;
    disabled?: boolean;
  }[];
  padding?: string;
}) => {
  const router = useRouter();

  return (
    <>
      <V.Row wrap="wrap" gap={5} crossGap={5} align="center" css={{ padding }}>
        <Txt size={14} color="#797979" padding={{ right: 8 }}>
          필터
        </Txt>

        {filters?.map((item) => (
          <>
            {!!item.name && (
              <V.Row
                width="auto"
                gap={8}
                align="center"
                padding={{ vertical: 8, left: 12, right: 6 }}
                backgroundColor={item.disabled ? "#f8f8f8" : "#fff"}
                borderRadius={100}
                border={{ solid: 1, position: "all", color: "#e9e9e9" }}
              >
                <TxtSpan size={14} color="#555">
                  {item.name}
                </TxtSpan>

                <TouchableOpacity
                  txtSize={12}
                  txtColor="#999"
                  onClick={() => item.onClick()}
                  padding={{ top: 1 }}
                >
                  <CancelIcon size={14} />
                </TouchableOpacity>
              </V.Row>
            )}
          </>
        ))}
      </V.Row>
    </>
  );
};

export default ActiveFilterBar;
