import { useEffect } from "react";
import { useLocation } from "wouter";
import { useTitle } from "~/hooks/useTitle";
import { CreateCaseContent } from "../organism";
import type { Category } from "../../types";

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Civil",
    description: "Casos relacionados con derecho civil",
  },
  {
    id: 2,
    name: "Penal",
    description: "Casos relacionados con derecho penal",
  },
  {
    id: 3,
    name: "Laboral",
    description: "Casos relacionados con derecho laboral",
  },
  {
    id: 4,
    name: "Familiar",
    description: "Casos relacionados con derecho familiar",
  },
  {
    id: 5,
    name: "Mercantil",
    description: "Casos relacionados con derecho mercantil",
  },
];

export default function CreateCasePage() {
  const [, setLocation] = useLocation();
  const onBack = () => setLocation("/");
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Crear caso - Arxatec");
  }, [changeTitle]);

  return (
    <div>
      <CreateCaseContent onBack={onBack} categories={mockCategories} />
    </div>
  );
}
