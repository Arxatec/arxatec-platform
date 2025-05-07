import { BarChart, LineChart } from "../molecules";
import { StatsGroup, Table } from "../organisms";
import { useTitle } from "~/hooks";
import { useEffect } from "react";

export default function DashboardPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Dashboard - Arxatec");
  }, [changeTitle]);
  return (
    <div className="px-6 max-w-7xl mx-auto min-h-screen">
      {/* Stats Group */}
      <StatsGroup />

      {/* Charts */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
        <LineChart />
        <BarChart />
      </div>

      {/* Table */}
      <Table />
    </div>
  );
}
