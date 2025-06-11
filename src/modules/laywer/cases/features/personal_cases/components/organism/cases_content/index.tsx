import { HeaderSection, SearchFilters, CasesTable } from "../../molecules";

interface CasesContentProps {
  onBack: () => void;
}

export const CasesContent = ({ onBack }: CasesContentProps) => {
  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <HeaderSection title="Mis casos" onBack={onBack} />
      <SearchFilters />
      <CasesTable />
    </div>
  );
};
