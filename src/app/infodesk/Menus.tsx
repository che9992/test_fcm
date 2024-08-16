import { useRouter } from "next/router";

//ui
import { TouchableOpacity } from "@/_ui";
import { colors } from "@/libs/themes";
import { P, V } from "react-layout-flexbox";

//
export default function Menus() {
  const router = useRouter();
  const { category } = router?.query;

  return (
    <P.Sticky
      width="100%"
      align="center"
      crossAlign="center"
      position={{ left: 0, right: 0, top: 59 }}
      padding={{ all: 20 }}
      backgroundColor="#fff"
      zIndex={10}
    >
      <V.Row
        maxWidth={680}
        backgroundColor="#f8f8f8"
        padding={{ all: 4 }}
        borderRadius={14}
      >
        {["웹", "안드로이드", "IOS"].map((el) => (
          <TouchableOpacity
            zIndex={2}
            width="100%"
            padding={{ all: 12 }}
            txtColor={
              !category && el === "웹"
                ? "#fff"
                : category === el
                ? "#fff"
                : "#888"
            }
            onClick={() => router.replace({ query: { category: el } })}
          >
            {el}
          </TouchableOpacity>
        ))}

        <P.Absolute
          zIndex={1}
          position={{
            top: 4,
            bottom: 4,
            left:
              (!category && 4) ||
              (category === "웹" && 4) ||
              (category === "안드로이드" && "50%") ||
              "100%",
          }}
          axis={{
            x:
              (!category && 1) ||
              (category === "웹" && 1) ||
              (category === "안드로이드" && "-50%") ||
              "-100%",
          }}
          minWidth="calc(100% / 3)"
          backgroundColor={colors.keyColor}
          transitionTime={0.3}
          borderRadius={14}
          children=""
        />
      </V.Row>
    </P.Sticky>
  );
}
