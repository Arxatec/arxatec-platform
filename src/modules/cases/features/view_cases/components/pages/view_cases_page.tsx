import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { Table } from "~/modules/dashboard/features/components/organisms";
import { ActionCardsGroup } from "../molecules";
import { CasesDashboard } from "../organism";
// Soon
//import { DocumentsSection } from "../organism";

export default function ViewCasesPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Casos - Arxatec");
  }, []);

  return (
    <div className="rounded-md max-w-7xl mx-auto px-6 min-h-screen">
      <div className="mx-auto">
        <ActionCardsGroup />
        <div className="mt-2">
          <CasesDashboard />
        </div>
        <Table />
      </div>
    </div>
  );
}
