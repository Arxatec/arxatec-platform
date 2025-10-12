import { CustomHeader } from "@/components/ui";
import { TableLawyers } from "../components";
import { useTitle } from "@/hooks";
import { useEffect } from "react";

export default function ViewLawyersPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Abogados - Arxatec");
  }, []);
  return (
    <div className="w-full max-w-5xl px-12 py-8 mx-auto">
      <CustomHeader
        title="Abogados"
        description="Estos son los abogados que están disponibles en la plataforma, puedes contactarlos para que te ayude en tu caso o estudio."
      />
      <TableLawyers />
    </div>
  );
}
