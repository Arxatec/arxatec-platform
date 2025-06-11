import { StatisticsGroup, CasesChart } from "../../molecules";

export const CasesDashboard = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2">
      <StatisticsGroup />
      <CasesChart />
    </div>
  );
};
