import {
  CalendarIcon,
  DocumentIcon,
  FolderIcon,
  IdentificationIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { CustomAvatar } from "~/components/atoms";
import { CustomTable } from "~/components/molecules";
import { StatusBadge } from "../../atoms";
import type { CaseStatus } from "../../atoms";

const columns = [
  {
    width: "w-1/12",
    header: {
      icon: <IdentificationIcon className="size-5 text-gray-500" />,
      label: "ID del Caso",
    },
    accessor: "id",
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
    width: "w-2/12",
    header: {
      icon: <UserIcon className="size-5 text-gray-500" />,
      label: "Cliente",
    },
    accessor: "client",
    align: "left" as const,
    renderCell: (value: string, row: any) => (
      <div className="flex items-center gap-3">
        <div className="relative size-8 bg-gray-100 flex-shrink-0">
          {row.clientImage && (
            <CustomAvatar
              avatar={row.clientImage}
              altText={value}
              username={row.client}
              size="2rem"
            />
          )}
        </div>
        <span className="whitespace-normal line-clamp-2 text-gray-700">
          {value}
        </span>
      </div>
    ),
  },
  {
    width: "w-2/12",
    header: {
      icon: <FolderIcon className="size-5 text-gray-500" />,
      label: "Tipo de Caso",
    },
    accessor: "type",
    align: "left" as const,
  },
  {
    width: "w-2/12",
    header: {
      icon: <DocumentIcon className="size-5 text-gray-500" />,
      label: "Estado",
    },
    accessor: "status",
    align: "left" as const,
    renderCell: (value: CaseStatus) => <StatusBadge status={value} />,
  },
  {
    width: "w-2/12",
    header: {
      icon: <CalendarIcon className="size-5 text-gray-500" />,
      label: "Fecha de Inicio",
    },
    accessor: "startDate",
    align: "left" as const,
  },
];

// Mock data moved to a separate file for better organization
const data = [
  {
    id: "ARX-2025-001",
    title: "Demanda por incumplimiento de contrato de servicios",
    client: "Empresa Tech Solutions S.A.",
    clientImage:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Civil",
    startDate: "01/03/2025",
    status: "en_progreso" as CaseStatus,
  },
  // ... más casos aquí
];

export const CasesTable = () => {
  return (
    <CustomTable
      columns={columns}
      data={data}
      onRowClick={(row) => console.log(row)}
    />
  );
};
