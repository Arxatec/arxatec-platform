import { useEffect, useRef } from "react";

const options = {
  series: [
    {
      data: [
        { x: "Casos en pendientes", y: 55 },
        { x: "Casos en proceso", y: 30 },
        { x: "Casos en públicos", y: 42 },
        { x: "Casos en juicio", y: 20 },
        { x: "Casos ganados", y: 25 },
        { x: "Casos perdidos", y: 22 },
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

export const CasesChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chartInstance: unknown;

    import("apexcharts").then((module) => {
      const ApexCharts = module.default;
      if (chartRef.current && typeof ApexCharts !== "undefined") {
        chartInstance = new ApexCharts(chartRef.current, options);
        chartInstance.render();
      }
    });

    return () => {
      if (
        chartInstance &&
        typeof chartInstance === "object" &&
        "destroy" in chartInstance
      ) {
        (chartInstance as { destroy: () => void }).destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all pb-4">
      <div className="w-full h-[300px] overflow-hidden px-4">
        <div id="bar-chart" ref={chartRef} className="w-full" />
      </div>
    </div>
  );
};
