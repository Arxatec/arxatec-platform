import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { TableClients } from "../components";
import { ROUTES } from "@/routes/routes";
import { PlusIcon } from "lucide-react";

export default function ViewClientsPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis clientes - Arxatec");
  }, []);
  return (
    <div className="w-full">
      <CustomHeader
        title="Mis clientes"
        button={{
          label: "Nuevo cliente",
          url: ROUTES.Lawyer.CreateClient,
          icon: PlusIcon,
        }}
      />
      <TableClients />
    </div>
  );
}
