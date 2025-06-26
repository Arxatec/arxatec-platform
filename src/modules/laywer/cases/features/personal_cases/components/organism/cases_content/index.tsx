import { useState, useCallback } from "react";
import { SearchFilters, CasesTable } from "../../molecules";
import { useFilteredCases } from "../../../hooks";
import { CustomHeader } from "~/components/molecules";
import { ROUTES } from "~/routes/routes";
import { useNavigate } from "react-router-dom";

interface Filters {
  search: string;
  category: string;
  sortBy: string;
}

export const CasesContent = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
    sortBy: "Más reciente",
  });
  const { data: cases, isLoading, error } = useFilteredCases(filters);
  const navigate = useNavigate();
  const onBack = () => navigate(ROUTES.Lawyer.Cases);

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <CustomHeader title="Mis casos" onBack={onBack} />
      <SearchFilters onFiltersChange={handleFiltersChange} />
      <CasesTable cases={cases} isLoading={isLoading} error={error} />
    </div>
  );
};
