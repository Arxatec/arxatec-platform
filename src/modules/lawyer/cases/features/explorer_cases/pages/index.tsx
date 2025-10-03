import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { TableCases } from "../components";

export default function ExplorerCasesPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Explorar casos - Arxatec");
  }, []);

  return (
    <div className="w-full">
      <CustomHeader
        title="Explorar casos"
        description="Estos son los casos que están disponibles y que fueron creador por clientes, puedes tomarlos para realizar un estudio y ofrecer tu servicio."
      />
      <TableCases />
    </div>
  );
}
