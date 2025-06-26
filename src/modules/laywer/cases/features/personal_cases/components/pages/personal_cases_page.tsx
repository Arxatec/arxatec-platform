import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { CasesContent } from "../organism";

export default function PersonalCasesPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis casos - Arxatec");
  }, []);

  return <CasesContent />;
}
