import { useEffect, useRef, useState } from "react";
import { CustomSelector } from "~/components/atoms";

var options = {
  series: [
    {
      name: "Nuevos clientes",
      data: [
        {
          x: "2025/03/01",
          y: 2,
        },
        {
          x: "2025/03/08",
          y: 4,
        },
        {
          x: "2025/03/15",
          y: 5,
        },
        {
          x: "2025/03/22",
          y: 2,
        },
        {
          x: "2025/03/29",
          y: 1,
        },
        {
          x: "2025/04/05",
          y: 5,
        },
        {
          x: "2025/04/12",
          y: 3,
        },
      ],
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      borderRadiusApplication: "end",
    },
  },
  dataLabels: {
    enabled: false,
  },
  chart: {
    type: "bar",
    height: 350,
    fontFamily: "DM Sans, sans-serif",
    toolbar: {
      show: false,
    },
  },
  xaxis: {},
  tooltip: {},
};

const filterBy = [
  {
    id: 5,
    name: "Última semana",
  },
  {
    id: 1,
    name: "Último mes",
  },
  {
    id: 2,
    name: "Últimos 3 meses",
  },
  {
    id: 3,
    name: "Últimos 6 meses",
  },
  {
    id: 4,
    name: "Último año",
  },
];

export const BarChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState(filterBy[0]);

  useEffect(() => {
    let chartInstance: any;

    import("apexcharts").then((module) => {
      const ApexCharts = module.default;
      if (chartRef.current && typeof ApexCharts !== "undefined") {
        chartInstance = new ApexCharts(chartRef.current, options);
        chartInstance.render();
      }
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg w-full shadow-sm hover:shadow-md transition-all">
      <div className="px-4 pt-4 flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-semibold text-lg">Tus clientes</h2>
        <div className="w-40">
          <CustomSelector
            options={filterBy}
            selected={filter}
            onChange={setFilter}
          />
        </div>
      </div>
      <div className="w-full h-[350px] overflow-hidden px-2 pb-2">
        <div id="bar-chart" ref={chartRef} className="w-full" />
      </div>
    </div>
  );
};
