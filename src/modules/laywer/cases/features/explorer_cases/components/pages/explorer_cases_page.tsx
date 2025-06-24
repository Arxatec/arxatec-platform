import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "~/hooks/useTitle";
import { ExplorerContent } from "../organism";
import { ROUTES } from "~/routes/routes";

export default function ExploreCasesPage() {
  const navigate = useNavigate();
  const onBack = () => navigate(ROUTES.AppRoutes.LawyerCases);
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Explorar casos - Arxatec");
  }, []);

  return <ExplorerContent onBack={onBack} />;
}
