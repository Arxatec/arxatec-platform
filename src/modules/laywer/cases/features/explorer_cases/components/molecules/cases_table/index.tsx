import {
  CalendarIcon,
  DocumentIcon,
  FolderIcon,
  IdentificationIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { CustomTable } from "~/components/molecules/custom_table";
import { CaseAvatar } from "../../atoms";
import { mockCases } from "./mock-data";

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
      <div className="whitespace-normal line-clamp-2">{value}</div>
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
    renderCell: (
      value: string,
      row: { clientImage?: string; client: string }
    ) => (
      <div className="flex items-center gap-3">
        <CaseAvatar imageUrl={row.clientImage} altText={row.client} />
        <span className="whitespace-normal line-clamp-2">{value}</span>
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
      icon: <CalendarIcon className="size-5 text-gray-500" />,
      label: "Fecha de Inicio",
    },
    accessor: "startDate",
    align: "left" as const,
  },
];

export const CasesTable = () => {
  return (
    <CustomTable
      columns={columns}
      data={mockCases}
      onRowClick={(row) => console.log(row)}
    />
  );
};
