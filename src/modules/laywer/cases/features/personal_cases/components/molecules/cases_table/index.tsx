import {
  CalendarIcon,
  DocumentIcon,
  FolderIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { CustomTable } from "~/components/molecules";
import type { CaseData } from "../../../types";

interface CasesTableProps {
  cases: CaseData[];
  isLoading: boolean;
  error: Error | null;
}

const columns = [
  {
    width: "w-2/12",
    header: {
      icon: <IdentificationIcon className="size-5 text-gray-500" />,
      label: "Código",
    },
    accessor: "reference_code",
    align: "left" as const,
  },
  {
    width: "w-4/12",
    header: {
      icon: <DocumentIcon className="size-5 text-gray-500" />,
      label: "Título del Caso",
    },
    accessor: "title",
    align: "left" as const,
    renderCell: (value: string) => (
      <div className="whitespace-normal line-clamp-2 text-gray-700">
        {value}
      </div>
    ),
  },
  {
    width: "w-3/12",
    header: {
      icon: <DocumentIcon className="size-5 text-gray-500" />,
      label: "Descripción",
    },
    accessor: "description",
    align: "left" as const,
    renderCell: (value: string) => (
      <div className="whitespace-normal line-clamp-2 text-gray-500 text-sm">
        {value}
      </div>
    ),
  },
  {
    width: "w-2/12",
    header: {
      icon: <FolderIcon className="size-5 text-gray-500" />,
      label: "Urgencia",
    },
    accessor: "urgency",
    align: "left" as const,
    renderCell: (value: "alta" | "media" | "baja") => {
      const urgencyColors = {
        alta: "bg-red-100 text-red-800",
        media: "bg-yellow-100 text-yellow-800",
        baja: "bg-green-100 text-green-800",
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[value]}`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      );
    },
  },
  {
    width: "w-2/12",
    header: {
      icon: <CalendarIcon className="size-5 text-gray-500" />,
      label: "Fecha de Creación",
    },
    accessor: "created_at",
    align: "left" as const,
    renderCell: (value: string) => {
      const date = new Date(value);
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
];

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
    <ExclamationCircleIcon className="size-14 text-gray-300 mb-2" />
    <h3 className="text-base font-medium text-gray-900 ">
      No tienes casos aún
    </h3>
    <p className="text-gray-500 max-w-sm text-sm mt-2">
      Cuando tengas casos asignados, aparecerán aquí para que puedas
      gestionarlos fácilmente.
    </p>
  </div>
);

const LoadingState = () => (
  <div className="bg-white rounded-lg shadow-sm">
    {/* Header skeleton */}
    <div className="border-b border-gray-200 px-6 py-3">
      <div className="flex space-x-4">
        <div className="w-2/12 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-4/12 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-3/12 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-2/12 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-2/12 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>

    {/* Rows skeleton */}
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="border-b border-gray-100 px-6 py-4">
        <div className="flex space-x-4 items-center">
          <div className="w-2/12 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-4/12 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4"></div>
          </div>
          <div className="w-3/12 space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3"></div>
          </div>
          <div className="w-2/12 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-2/12 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

const ErrorState = ({ error }: { error: Error }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <ExclamationCircleIcon className="size-16 text-red-300 mb-4" />
    <h3 className="text-lg font-medium text-red-900 mb-2">
      Error al cargar los casos
    </h3>
    <p className="text-red-600 max-w-md">{error.message}</p>
  </div>
);

export const CasesTable = ({ cases, isLoading, error }: CasesTableProps) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!cases || cases.length === 0) {
    return <EmptyState />;
  }

  return (
    <CustomTable
      columns={columns}
      data={cases}
      onRowClick={(row) => console.log(row)}
    />
  );
};
