import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useTitle } from "@/hooks";
import { TableCases } from "../components";

export default function ViewCasesPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis casos - Arxatec");
  }, []);

  return (
    <div className="w-full p-8">
      <CustomHeader
        title="Mis casos"
        button={{
          label: "Nuevo caso",
          url: ROUTES.Lawyer.CreateCase,
          icon: PlusIcon,
        }}
      />
      <TableCases />
    </div>
  );
}
