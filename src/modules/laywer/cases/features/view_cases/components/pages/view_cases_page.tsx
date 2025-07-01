import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { Table } from "~/modules/shared/dashboard/features/components/organisms";
import { ActionCardsGroup } from "../molecules";
import { CasesDashboard } from "../organism";
import { usePersonalCases } from "~/modules/laywer/cases/features/personal_cases/hooks";
import type { CaseData } from "~/modules/laywer/cases/features/personal_cases/types";

// Función para transformar datos de API a formato de tabla
const transformCasesToTableData = (cases: CaseData[]) => {
  return cases.map((caseItem) => ({
    ...caseItem,
    commit: caseItem.reference_code || `#${caseItem.id}`,
    case: caseItem.title,
    user: {
      name: "Usuario Abogado", // Placeholder - aquí iría el nombre real del usuario
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    folder: getStatusByStatusId(caseItem.status_id),
    status: getStatusByStatusId(caseItem.status_id),
    date: formatDate(caseItem.created_at),
    dateTime: caseItem.created_at,
  }));
};

// Función helper para obtener estado por status_id
const getStatusByStatusId = (statusId: number): string => {
  const statusMap: Record<number, string> = {
    1: "Progress",
    2: "Completed",
    3: "Error",
  };
  return statusMap[statusId] || "Progress";
};

// Función helper para formatear fecha
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Hace 1 día";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
  return `Hace ${Math.ceil(diffDays / 30)} meses`;
};

export default function ViewCasesPage() {
  const { changeTitle } = useTitle();
  const { data, isLoading, error } = usePersonalCases();

  useEffect(() => {
    changeTitle("Casos - Arxatec");
  }, []);

  // Transformar datos para la tabla
  const tableData = data?.data
    ? transformCasesToTableData(data.data.cases)
    : [];

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="rounded-md max-w-7xl mx-auto px-6 min-h-screen">
      <div className="mx-auto">
        <ActionCardsGroup />
        <div className="mt-2">
          <CasesDashboard />
        </div>
      </div>
    </div>
  );
}
