import { classNames } from "~/utilities/string_utilities";
import type { Case } from "../../../../../store/cases.store";

const statusConfig: Record<
  Case["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Pendiente",
    className: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
  },
  in_progress: {
    label: "En progreso",
    className: "bg-blue-50 text-blue-800 ring-blue-600/20",
  },
  completed: {
    label: "Completado",
    className: "bg-green-50 text-green-800 ring-green-600/20",
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-red-50 text-red-800 ring-red-600/20",
  },
};

interface CaseStatusBadgeProps {
  status: Case["status"];
  caseId: number;
}

export const CaseStatusBadge = ({ status }: CaseStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
        config.className
      )}
    >
      {config.label}
    </span>
  );
};
