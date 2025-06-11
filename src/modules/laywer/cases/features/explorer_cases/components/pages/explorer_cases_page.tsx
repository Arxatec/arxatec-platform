import { useEffect } from "react";
import { useLocation } from "wouter";
import { useTitle } from "~/hooks/useTitle";
import { ExplorerContent } from "../organism";

export default function ExploreCasesPage() {
  const [, setLocation] = useLocation();
  const onBack = () => setLocation("/");
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Explorar casos - Arxatec");
  }, []);

  return <ExplorerContent onBack={onBack} />;
}
