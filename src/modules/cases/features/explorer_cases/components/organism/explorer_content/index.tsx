import { HeaderSection, SearchFilters, CasesTable } from "../../molecules";

interface ExplorerContentProps {
  onBack: () => void;
}

export const ExplorerContent = ({ onBack }: ExplorerContentProps) => {
  return (
    <div className="mx-auto max-w-6xl px-6 min-h-screen">
      <HeaderSection title="Explorar casos" onBack={onBack} />
      <SearchFilters />
      <CasesTable />
    </div>
  );
};
