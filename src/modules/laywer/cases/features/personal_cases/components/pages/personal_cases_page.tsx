import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "~/hooks/useTitle";
import { CasesContent } from "../organism";
import { ROUTES } from "~/routes/routes";

export default function PersonalCasesPage() {
  const navigate = useNavigate();
  const onBack = () => navigate(ROUTES.AppRoutes.LawyerCases);
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis casos - Arxatec");
  }, []);

  return <CasesContent onBack={onBack} />;
}
