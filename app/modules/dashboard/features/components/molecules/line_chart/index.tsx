import { useEffect, useRef } from "react";

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
      name: "New users",
      data: [6500, 6418, 6456, 6526, 6356, 6456, 6242, 7611],
      color: "#1A56DB",
    },
  ],
  xaxis: {
    categories: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
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

export const LineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

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
    <div className="bg-white rounded-lg w-full shadow-sm">
      <div className="px-4 pt-4 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Ganancias</h2>
      </div>
      <div className="w-full h-[350px] overflow-hidden px-2 pb-2">
        <div id="line-chart" ref={chartRef} className="w-full" />
      </div>
    </div>
  );
};
