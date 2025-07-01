import { useEffect, useRef } from "react";
import type { CasesSummaryData } from "../../../types";
import ApexCharts from "apexcharts";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import { CustomStatusState } from "~/components/atoms";

interface CasesChartProps {
  data: CasesSummaryData;
}

export const CasesChart = ({ data }: CasesChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Verificar si todos los valores son 0
  const hasData =
    data.casesInReview > 0 ||
    data.casesInProcess > 0 ||
    data.casesClosed > 0 ||
    data.casesArchived > 0;

  const options = {
    series: [
      {
        data: [
          { x: "Casos en revisión", y: data.casesInReview },
          { x: "Casos en proceso", y: data.casesInProcess },
          { x: "Casos cerrados", y: data.casesClosed },
          { x: "Casos archivados", y: data.casesArchived },
        ],
      },
    ],
    chart: {
      height: 300,
      type: "treemap",
      toolbar: { show: false },
      fontFamily: "DM Sans, sans-serif",
    },
    legend: { show: true },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: true,
        shadeIntensity: 0.6,
      },
    },
    colors: ["#2563eb"],
  };

  useEffect(() => {
    if (!hasData) return;

    let chartInstance: ApexCharts;

    if (chartRef.current && typeof ApexCharts !== "undefined") {
      chartInstance = new ApexCharts(chartRef.current, options);
      chartInstance.render();
    }

    return () => {
      if (
        chartInstance &&
        typeof chartInstance === "object" &&
        "destroy" in chartInstance
      ) {
        (chartInstance as { destroy: () => void }).destroy();
      }
    };
  }, [data, hasData]);
  if (!hasData)
    return (
      <CustomStatusState
        icon={<ChartBarIcon className="size-10 text-gray-300 mb-2" />}
        title="No hay información por el momento"
        message="Cuando tengas casos registrados, aparecerán aquí en el gráfico para que puedas visualizar su distribución."
      />
    );

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all pb-4">
      <div className="w-full h-[300px] overflow-hidden px-4">
        <div id="bar-chart" ref={chartRef} className="w-full" />
      </div>
    </div>
  );
};
