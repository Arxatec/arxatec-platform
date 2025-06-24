import { useQuery } from "@tanstack/react-query";
import { StatisticsGroup, CasesChart } from "../../molecules";
import { DashboardSkeleton, DashboardError } from "../../atoms";
import { getCasesSummary } from "../../../services";
import type { CasesSummaryResponse } from "../../../types";

export const CasesDashboard = () => {
  const {
    data: casesSummary,
    isPending,
    error,
  } = useQuery<CasesSummaryResponse>({
    queryKey: ["cases-summary"],
    queryFn: getCasesSummary,
  });

  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <DashboardError />;
  }

  if (!casesSummary?.data) {
    return <DashboardError />;
  }

  return (
    <div className="grid grid-cols-[auto_1fr] gap-2">
      <StatisticsGroup data={casesSummary.data} />
      <CasesChart data={casesSummary.data} />
    </div>
  );
};
