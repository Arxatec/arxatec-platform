import { useState, useCallback } from "react";
import { HeaderSection, SearchFilters, CasesTable } from "../../molecules";

interface ExplorerContentProps {
  onBack: () => void;
}

export const ExplorerContent = ({ onBack }: ExplorerContentProps) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sortBy: "Más reciente",
  });

  const handleFiltersChange = useCallback(
    (newFilters: { search: string; category: string; sortBy: string }) => {
      setFilters(newFilters);
    },
    []
  );

  return (
    <div className="mx-auto max-w-6xl px-6 min-h-screen">
      <HeaderSection title="Explorar casos" onBack={onBack} />
      <SearchFilters onFiltersChange={handleFiltersChange} />
      <CasesTable filters={filters} />
    </div>
  );
};
