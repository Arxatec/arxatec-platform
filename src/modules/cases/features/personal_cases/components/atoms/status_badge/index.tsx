export type CaseStatus = "en_progreso" | "completado" | "abierto" | "en_pausa";

const statusColors: Record<CaseStatus, { color: string; bgColor: string }> = {
  en_progreso: {
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
  },
  completado: {
    color: "bg-green-500",
    bgColor: "bg-green-50",
  },
  abierto: {
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
  },
  en_pausa: {
    color: "bg-gray-500",
    bgColor: "bg-gray-50",
  },
};

const statusLabels: Record<CaseStatus, string> = {
  en_progreso: "En progreso",
  completado: "Completado",
  abierto: "Abierto",
  en_pausa: "En pausa",
};

interface StatusBadgeProps {
  status: CaseStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`size-3 rounded-sm flex items-center justify-center ${statusColors[status].bgColor}`}
      >
        <div className={`size-1.5 rounded-sm ${statusColors[status].color}`} />
      </div>
      <span className="text-sm text-gray-700">{statusLabels[status]}</span>
    </div>
  );
};
