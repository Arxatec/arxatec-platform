import { useEffect } from "react";
import { useLocation } from "wouter";
import { useTitle } from "~/hooks/useTitle";
import { CreateCaseContent } from "../organism";

export default function CreateCasePage() {
  const [, setLocation] = useLocation();
  const onBack = () => setLocation("/");
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Crear caso - Arxatec");
  }, []);

  return <CreateCaseContent onBack={onBack} />;
}
