import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { ExplorerContent } from "../organism";

export default function ExploreCasesPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Explorar casos - Arxatec");
  }, []);

  return <ExplorerContent />;
}
