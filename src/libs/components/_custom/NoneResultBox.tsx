import { TouchableOpacity, Txt, V } from "@/_ui";
import { WarningIcon } from "@/libs/assets/icon-fill";

export default function NoneResultBox({
  description,
  backgroundColor,
  sizes,
  colors,
  padding,
  resetEvent,
}: {
  description: string;
  backgroundColor?: string;
  sizes?: {
    icon: number;
    description: number;
  };
  colors?: {
    icon: string;
    description: string;
  };
  padding?: number | string;
  resetEvent?: () => void;
}) {
  return (
    <V.Column
      align="center"
      gap={8}
      backgroundColor={backgroundColor}
      borderRadius={14}
      css={{ padding: padding ?? 14 }}
    >
      <WarningIcon width={sizes?.icon ?? 18} fill={colors?.icon ?? "#b9b9a1"} />
      <Txt
        txtAlign="center"
        color={colors?.description ?? "#999"}
        size={sizes?.description ?? 13}
      >
        {description}
      </Txt>

      {!!resetEvent && (
        <TouchableOpacity padding={{ all: 6 }} onClick={resetEvent}>
          필터 초기화
        </TouchableOpacity>
      )}
    </V.Column>
  );
}
