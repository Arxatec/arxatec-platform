import { useState, useCallback } from "react";
import { HeaderSection, SearchFilters, CasesTable } from "../../molecules";
import { useFilteredCases } from "../../../hooks";

interface CasesContentProps {
  onBack: () => void;
}

interface Filters {
  search: string;
  category: string;
  sortBy: string;
}

export const CasesContent = ({ onBack }: CasesContentProps) => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
    sortBy: "Más reciente",
  });

  const { data: cases, isLoading, error } = useFilteredCases(filters);

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <HeaderSection title="Mis casos" onBack={onBack} />
      <SearchFilters onFiltersChange={handleFiltersChange} />
      <CasesTable cases={cases} isLoading={isLoading} error={error} />
    </div>
  );
};
