import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  DocumentIcon,
  FolderIcon,
  FolderPlusIcon,
  GlobeAltIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { CustomInput } from "~/components/atoms";
import { Table } from "~/modules/dashboard/features/components/organisms";
import { APP_PATHS } from "~/routes/routes";
var options = {
  series: [
    {
      data: [
        {
          x: "Casos en pendientes",
          y: 55,
        },
        {
          x: "Casos en proceso",
          y: 30,
        },
        {
          x: "Casos en públicos",
          y: 42,
        },
        {
          x: "Casos en juicio",
          y: 20,
        },
        {
          x: "Casos ganados",
          y: 25,
        },
        {
          x: "Casos perdidos",
          y: 22,
        },
      ],
    },
  ],
  chart: {
    height: 300,
    type: "treemap",
    toolbar: {
      show: false,
    },
    fontFamily: "DM Sans, sans-serif",
  },
  legend: {
    show: true,
  },

  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: true,
      shadeIntensity: 0.6,
    },
  },
  colors: ["#2563eb"],
};
interface Case {
  id: string;
  title: string;
  client: string;
  nextCourtDate: string;
  created: string;
  status: "PENDIENTE" | "ACEPTADO" | "CERRADO" | "CANCELADO";
  isNew?: boolean;
}

export default function ViewCasesPage() {
  const navigate = useNavigate();
  const navigateToExplorerCases = () => navigate(APP_PATHS.EXPLORER_CASES);
  const navigateToMyCases = () => navigate(APP_PATHS.PERSONAL_CASES);
  const navigateToClients = () => navigate(APP_PATHS.CLIENTS);
  const navigateToCreateCase = () => navigate(APP_PATHS.CREATE_CASE);

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
    <div className=" rounded-md max-w-7xl mx-auto px-6 min-h-screen">
      <div className=" mx-auto">
        <div className="flex gap-2">
          <button
            onClick={navigateToExplorerCases}
            className="w-full max-w-80 shadow-sm hover:shadow-md transition-all rounded-md p-4 bg-white"
          >
            <div>
              <div className="flex items-start gap-2 justify-between">
                <div className="flex w-fit items-center gap-2 bg-blue-50 rounded-md p-2">
                  <GlobeAltIcon className="size-6 text-blue-600" />
                </div>

                <ArrowUpRightIcon className="size-4 text-gray-500" />
              </div>
              <h2 className="text-base font-semibold text-gray-900 mt-2 text-left">
                Explorar casos
              </h2>
            </div>
          </button>
          <button
            onClick={navigateToClients}
            className="w-full max-w-80 shadow-sm hover:shadow-md transition-all rounded-md p-4 bg-white"
          >
            <div>
              <div className="flex items-start gap-2 justify-between">
                <div className="flex w-fit items-center gap-2 bg-indigo-50 rounded-md p-2">
                  <UserIcon className="size-6 text-indigo-600" />
                </div>

                <ArrowUpRightIcon className="size-4 text-gray-500" />
              </div>
              <h2 className="text-base font-semibold text-gray-900 mt-2 text-left">
                Mis clientes
              </h2>
            </div>
          </button>
          <button
            onClick={navigateToMyCases}
            className="w-full max-w-80 shadow-sm hover:shadow-md transition-all rounded-md p-4 bg-white"
          >
            <div>
              <div className="flex items-start gap-2 justify-between">
                <div className="flex w-fit items-center gap-2 bg-sky-50 rounded-md p-2">
                  <FolderIcon className="size-6 text-sky-500" />
                </div>

                <ArrowUpRightIcon className="size-4 text-gray-500" />
              </div>
              <h2 className="text-base font-semibold text-gray-900 mt-2 text-left">
                Mis casos
              </h2>
            </div>
          </button>
          <button
            onClick={navigateToCreateCase}
            className="w-full max-w-80 shadow-sm hover:shadow-md transition-all rounded-md p-4 bg-white"
          >
            <div>
              <div className="flex items-start gap-2 justify-between">
                <div className="flex w-fit items-center gap-2 bg-cyan-50 rounded-md p-2">
                  <FolderPlusIcon className="size-6 text-cyan-500" />
                </div>

                <ArrowUpRightIcon className="size-4 text-gray-500" />
              </div>
              <h2 className="text-base font-semibold text-gray-900 mt-2 text-left">
                Crear caso
              </h2>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-2 mt-2">
          <div className="flex flex-col gap-2">
            <div className="bg-white rounded-lg w-96 shadow-sm hover:shadow-md transition-all p-4 ">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="font-medium text-sm text-gray-600">
                  Cantidad de clientes
                </h2>
              </div>
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <h1 className="text-4xl font-extrabold mt-2 text-gray-900">
                  92
                </h1>
                <p className="text-xs font-semibold text-green-600 bg-green-50 rounded-md px-2 py-1 flex items-center gap-2">
                  +55%
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg w-96 shadow-sm hover:shadow-md transition-all p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="font-medium text-sm text-gray-600">
                  Total de casos
                </h2>
              </div>
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <h1 className="text-4xl font-extrabold mt-2 text-gray-900">
                  118
                </h1>
                <p className="text-xs font-semibold text-red-600 bg-red-50 rounded-md px-2 py-1 flex items-center gap-2">
                  -10%
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg w-96 shadow-sm hover:shadow-md transition-all p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="font-medium text-sm text-gray-600">
                  Casos públicos
                </h2>
              </div>
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <h1 className="text-4xl font-extrabold mt-2 text-gray-900">
                  1217
                </h1>
                <p className="text-xs font-semibold text-green-600 bg-green-50 rounded-md px-2 py-1 flex items-center gap-2">
                  +10%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all pb-4">
            <div className="w-full h-[300px] overflow-hidden px-4">
              <div id="bar-chart" ref={chartRef} className="w-full" />
            </div>
          </div>
        </div>

        <div className="gap-2 grid grid-cols-1 md:grid-cols-[1fr_auto]">
          <Table />
          <div>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-[18px] w-96 mt-2">
              <h2 className="font-bold text-lg text-gray-900">
                Tus documentos
              </h2>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <button className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 w-96 flex items-center gap-2">
                <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 w-fit">
                  <DocumentIcon className="size-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 text-left">
                    Documento 1
                  </h2>
                  <p className="text-xs text-gray-500">
                    Última actualización: 10/03/2025
                  </p>
                </div>
              </button>

              <button className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 w-96 flex items-center gap-2">
                <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 w-fit">
                  <DocumentIcon className="size-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 text-left">
                    Documento 1
                  </h2>
                  <p className="text-xs text-gray-500">
                    Última actualización: 10/03/2025
                  </p>
                </div>
              </button>
              <button className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 w-96 flex items-center gap-2">
                <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 w-fit">
                  <DocumentIcon className="size-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 text-left">
                    Documento 1
                  </h2>
                  <p className="text-xs text-gray-500">
                    Última actualización: 10/03/2025
                  </p>
                </div>
              </button>
              <button className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 w-96 flex items-center gap-2">
                <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 w-fit">
                  <DocumentIcon className="size-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 text-left">
                    Documento 1
                  </h2>
                  <p className="text-xs text-gray-500">
                    Última actualización: 10/03/2025
                  </p>
                </div>
              </button>
              <button className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 w-96 flex items-center gap-2">
                <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 w-fit">
                  <DocumentIcon className="size-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 text-left">
                    Documento 1
                  </h2>
                  <p className="text-xs text-gray-500">
                    Última actualización: 10/03/2025
                  </p>
                </div>
              </button>
              <button className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 w-96 flex items-center gap-2">
                <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 w-fit">
                  <DocumentIcon className="size-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 text-left">
                    Documento 1
                  </h2>
                  <p className="text-xs text-gray-500">
                    Última actualización: 10/03/2025
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
