import { useEffect } from "react";
import { useLocation } from "wouter";
import { useTitle } from "~/hooks/useTitle";
import { CasesContent } from "../organism";

export default function PersonalCasesPage() {
  const [, setLocation] = useLocation();
  const onBack = () => setLocation("/");
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis casos - Arxatec");
  }, []);

  return <CasesContent onBack={onBack} />;
}
