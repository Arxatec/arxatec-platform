import {
  CalendarIcon,
  DocumentIcon,
  FolderIcon,
  IdentificationIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { CustomTable } from "~/components/molecules/custom_table";
import { CasesSkeleton, CasesError } from "../../atoms";
import { useFilteredCases } from "../../../hooks";
import type { CaseData } from "../../../types";
import { useToastMutation } from "~/components/molecules/toast_manager/hooks";
import { axiosInstance } from "~/interceptors";

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

const takeCaseService = async (caseId: string) => {
  const response = await axiosInstance.patch(`/cases/${caseId}/status`, {
    status_id: 2,
    note: "El cliente solicitó pasar a revisión",
  });
  return response.data;
};

export const CasesTable = ({ filters }: CasesTableProps) => {
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: cases,
    isLoading,
    error,
    refetch,
    totalCases,
    filteredCount,
  } = useFilteredCases(filters);

  const takeCaseMutation = useToastMutation({
    mutationOptions: {
      mutationFn: (caseId: string) => takeCaseService(caseId),
      onSuccess: () => {
        setIsModalOpen(false);
        setSelectedCase(null);
        refetch();
      },
    },
    toastOptions: {
      loading: {
        title: "Tomando caso",
        content: "Estamos asignando el caso, por favor espera un momento.",
      },
      success: {
        title: "Caso tomado correctamente",
        content: "El caso fue asignado a ti correctamente.",
      },
      error: {
        title: "Error al tomar el caso",
        content:
          "Ops sucedió un error, intenta nuevamente por favor, si el problema persiste, contacta con el administrador.",
      },
    },
  });

  if (isLoading) {
    return <CasesSkeleton />;
  }

  if (error) {
    return <CasesError error={error} onRetry={() => refetch()} />;
  }

  const handleRowClick = (caseData: CaseData) => {
    setSelectedCase(caseData);
    setIsModalOpen(true);
  };

  const handleTakeCase = () => {
    if (selectedCase) {
      takeCaseMutation.mutate(selectedCase.id.toString());
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  return (
    <div className="space-y-4">
      <CustomTable columns={columns} data={cases} onRowClick={handleRowClick} />

      {/* Modal para tomar caso */}
      {isModalOpen && selectedCase && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={handleCloseModal}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleCloseModal}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <DocumentIcon className="h-6 w-6 text-blue-600" />
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Tomar Caso
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      ¿Estás seguro de que quieres tomar el caso "
                      {selectedCase.title}"?
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Código: ...{selectedCase.reference_code.slice(-11)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleTakeCase}
                  disabled={takeCaseMutation.isPending}
                >
                  {takeCaseMutation.isPending ? "Tomando..." : "Sí, tomar caso"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
