import {
  CalendarIcon,
  DocumentIcon,
  SignalIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { CustomTable } from "~/components/molecules";
import type { CaseData } from "../../../types";
import { CustomStatusState } from "~/components/atoms";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/routes";

const categories = {
  1: "Derecho penal",
  2: "Derecho civil",
  3: "Derecho laboral",
  4: "Derecho comercial",
  5: "Derecho de familia",
};

const statuses = {
  1: "Registrado",
  2: "En revisión",
  3: "En proceso",
  4: "Con resolución",
  5: "Cerrado",
};

interface CasesTableProps {
  cases: CaseData[];
  isLoading: boolean;
  error: Error | null;
}

const columns = [
  {
    width: "w-8/12",
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
    width: "w-2/12",
    header: {
      icon: <TagIcon className="size-5 text-gray-500" />,
      label: "Categoría",
    },
    accessor: "category_id",
    align: "left" as const,
    renderCell: (value: number) => {
      const getCategoryName = (categoryId: number) => {
        const categories: { [key: number]: string } = {
          1: "Penal",
          2: "Civil",
          3: "Laboral",
          4: "Comercial",
          5: "Familia",
        };
        return categories[categoryId] || `Categoría ${categoryId}`;
      };
      return (
        <div className="whitespace-normal line-clamp-2 text-gray-700">
          {getCategoryName(value)}
        </div>
      );
    },
  },
  {
    width: "w-2/12",
    header: {
      icon: <SignalIcon className="size-5 text-gray-500" />,
      label: "Estado",
    },
    accessor: "status_id",
    align: "left" as const,
    renderCell: (value: number) => {
      return (
        <div className="whitespace-normal line-clamp-2 text-gray-700">
          {statuses[value]}
        </div>
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

export const CasesTable = ({ cases, isLoading, error }: CasesTableProps) => {
  const navigate = useNavigate();
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <CustomStatusState
        icon={
          <ExclamationTriangleIcon className="size-10 text-gray-300 mb-2" />
        }
        title="Error al cargar los casos"
        message="Sucedió un error al cargar los casos, por favor intente nuevamente, si el problema persiste, por favor contacte al soporte."
      />
    );
  }

  if (!cases || cases.length === 0) {
    return (
      <CustomStatusState
        title="No tienes casos aún"
        message="Cuando tengas casos asignados, aparecerán aquí para que puedas gestionarlos fácilmente."
      />
    );
  }

  return (
    <CustomTable
      columns={columns}
      data={cases}
      onRowClick={(row) =>
        navigate(ROUTES.Lawyer.CaseDetail.replace(":id", row.id.toString()))
      }
    />
  );
};
