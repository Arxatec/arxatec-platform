import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { HeaderSection } from "../molecules";
import { ClientsGrid } from "../organism";
import { ROUTES } from "~/routes/routes";

export default function ClientsPage() {
  const navigate = useNavigate();
  const onBack = () => navigate(ROUTES.AppRoutes.LawyerCases);
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis clientes - Arxatec");
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <HeaderSection title="Mis clientes" onBack={onBack} />
      <ClientsGrid />
    </div>
  );
}
