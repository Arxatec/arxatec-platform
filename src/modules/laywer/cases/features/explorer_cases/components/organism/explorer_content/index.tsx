import { useState, useCallback } from "react";
import { SearchFilters, CasesTable } from "../../molecules";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/routes";
import { CustomHeader } from "~/components/molecules";

export const ExplorerContent = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sortBy: "Más reciente",
  });
  const navigate = useNavigate();
  const onBack = () => navigate(ROUTES.Lawyer.Cases);

  const handleFiltersChange = useCallback(
    (newFilters: { search: string; category: string; sortBy: string }) => {
      setFilters(newFilters);
    },
    []
  );

  return (
    <div className="mx-auto max-w-6xl px-6 min-h-screen">
      <CustomHeader title="Explorar casos" onBack={onBack} />
      <SearchFilters onFiltersChange={handleFiltersChange} />
      <CasesTable filters={filters} />
    </div>
  );
};
