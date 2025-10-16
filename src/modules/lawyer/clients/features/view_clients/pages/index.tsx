import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { DirectoryClients } from "../components";
import { ROUTES } from "@/routes/routes";
import { PlusIcon } from "lucide-react";

export default function ViewClientsPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis clientes - Arxatec");
  }, []);
  return (
    <div className="w-full p-8">
      <CustomHeader
        title="Mis clientes"
        description="Estos son los clientes que creaste en la plataforma o que te contactaron para que les ayudes en su caso, puedes editarlos o crear uno nuevo si es necesario."
        button={{
          label: "Nuevo cliente",
          url: ROUTES.Lawyer.CreateClient,
          icon: PlusIcon,
        }}
      />
      <DirectoryClients />
    </div>
  );
}
