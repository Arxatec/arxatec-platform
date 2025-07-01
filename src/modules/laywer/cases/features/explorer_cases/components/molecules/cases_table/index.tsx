import {
  CalendarIcon,
  DocumentIcon,
  FolderIcon,
  IdentificationIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { CustomTable } from "~/components/molecules/custom_table";
import { CasesSkeleton, CasesError } from "../../atoms";
import { useFilteredCases } from "../../../hooks";
import type { CaseData } from "../../../types";

interface CasesTableProps {
  filters: {
    search: string;
    category: string;
    sortBy: string;
  };
}

const columns = [
  {
    width: "w-2/12",
    header: {
      icon: <IdentificationIcon className="size-5 text-gray-500" />,
      label: "Código de Referencia",
    },
    accessor: "reference_code",
    align: "left" as const,
    renderCell: (value: string) => {
      const lastFourDigits = value.slice(-11);
      return (
        <span className="font-mono text-sm font-semibold text-blue-600">
          ...{lastFourDigits}
        </span>
      );
    },
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
      <div className="whitespace-normal line-clamp-2 font-medium">{value}</div>
    ),
  },
  {
    width: "w-2/12",
    header: {
      icon: <FolderIcon className="size-5 text-gray-500" />,
      label: "Categoría",
    },
    accessor: "category_id",
    align: "left" as const,
    renderCell: (value: number) => {
      const getCategoryName = (categoryId: number) => {
        const categories: { [key: number]: string } = {
          1: "Laboral",
          2: "Civil",
          3: "Penal",
          4: "Familiar",
          5: "Comercial",
        };
        return categories[categoryId] || `Categoría ${categoryId}`;
      };

      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium text-gray-700">
          {getCategoryName(value)}
        </span>
      );
    },
  },
  {
    width: "w-2/12",
    header: {
      icon: <TagIcon className="size-5 text-gray-500" />,
      label: "Urgencia",
    },
    accessor: "urgency",
    align: "left" as const,
    renderCell: (value: string) => {
      const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
          case "alta":
            return "bg-indigo-100 text-indigo-600";
          case "media":
            return "bg-sky-100 text-sky-600";
          case "baja":
            return "bg-blue-100 text-blue-600";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium ${getUrgencyColor(
            value
          )}`}
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
      return (
        <span className="text-sm text-gray-600">
          {new Date(value).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
  },
];

export const CasesTable = ({ filters }: CasesTableProps) => {
  const {
    data: cases,
    isLoading,
    error,
    refetch,
    totalCases,
    filteredCount,
  } = useFilteredCases(filters);

  if (isLoading) {
    return <CasesSkeleton />;
  }

  if (error) {
    return <CasesError error={error} onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-4">
      <CustomTable
        columns={columns}
        data={cases}
        onRowClick={(row: CaseData) => console.log("Caso seleccionado:", row)}
      />
    </div>
  );
};
