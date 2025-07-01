import { useQuery } from "@tanstack/react-query";
import { StatisticsGroup, CasesChart } from "../../molecules";
import { DashboardSkeleton, DashboardError } from "../../atoms";
import { getCasesSummary } from "../../../services";
import type { CasesSummaryResponse } from "../../../types";
import { CustomStatusState } from "~/components/atoms";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

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
    return (
      <CustomStatusState
        icon={
          <ExclamationTriangleIcon className="size-10 text-gray-300 mb-2" />
        }
        title="Error al cargar la información"
        message="Sucedió un error al cargar la información, por favor intente nuevamente, si el problema persiste, por favor contacte al soporte."
      />
    );
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
