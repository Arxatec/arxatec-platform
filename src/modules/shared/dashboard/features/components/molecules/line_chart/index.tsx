import { useEffect, useRef, useState } from "react";
import { CustomSelector } from "~/components/atoms";

const options = {
  chart: {
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    type: "area",
    fontFamily: "DM Sans, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
    y: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 4,
  },
  grid: {
    show: true,
    strokeDashArray: 4,
    padding: {
      left: 4,
      right: 0,
      top: 0,
    },
  },
  series: [
    {
      name: "Pagos",
      data: [1200, 2151, 1510, 1510, 2020, 4020, 1000],
      color: "#1A56DB",
    },
  ],
  xaxis: {
    categories: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
    labels: {
      show: true,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
  },
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

export const LineChart: React.FC = () => {
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
      <div className="px-4 pt-4 flex items-center justify-between flex-wrap gap-4">
        <h2 className="font-bold text-lg">Tus ganancias</h2>
        <div className="w-40">
          <CustomSelector
            options={filterBy}
            selected={filter}
            onChange={setFilter}
          />
        </div>
      </div>
      <div className="w-full h-[350px] overflow-hidden px-2 pb-2">
        <div id="line-chart" ref={chartRef} className="w-full" />
      </div>
    </div>
  );
};
