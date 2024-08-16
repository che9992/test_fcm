//libs
import { V } from "@/_ui";

//components
import View from "@/app/_layout/components/View";
import GradeTable from "@/app/education/main/components/GradeTable";
import CurriTable from "@/app/education/main/components/CurriTable";
import ConsoultTable from "@/app/education/main/components/ConsoultTable";

//
export default function Service() {
  return (
    <View category="서비스">
      <V.Column gap={44} maxWidth={1030} padding={{ top: 30, bottom: 40 }}>
        <GradeTable />
        <CurriTable />
        <ConsoultTable />
      </V.Column>
    </View>
  );
}

Service.auth = true;
