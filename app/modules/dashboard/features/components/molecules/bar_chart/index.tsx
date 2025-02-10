import { useEffect, useRef } from "react";

var options = {
  series: [
    {
      name: "sales",
      data: [
        {
          x: "2019/01/01",
          y: 400,
        },
        {
          x: "2019/04/01",
          y: 430,
        },
        {
          x: "2019/07/01",
          y: 448,
        },
        {
          x: "2019/10/01",
          y: 470,
        },
        {
          x: "2020/01/01",
          y: 540,
        },
        {
          x: "2020/04/01",
          y: 580,
        },
        {
          x: "2020/07/01",
          y: 690,
        },
        {
          x: "2020/10/01",
          y: 690,
        },
      ],
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 5,
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

export const BarChart = () => {
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
        <div id="bar-chart" ref={chartRef} className="w-full" />
      </div>
    </div>
  );
};
