import { StatCard } from "../../atoms";
import type { CasesSummaryData } from "../../../types";

interface StatisticsGroupProps {
  data: CasesSummaryData;
}

export const StatisticsGroup = ({ data }: StatisticsGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      <StatCard
        title="Total de clientes"
        value={data.totalClients + data.totalExternalClients}
      />
      <StatCard title="Total de casos" value={data.totalCases} />
      <StatCard title="Casos en proceso" value={data.casesInProcess} />
    </div>
  );
};
