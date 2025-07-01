import {
  ClockIcon,
  DocumentIcon,
  IdentificationIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  CustomAvatar,
  CustomInput,
  CustomSelector,
  CustomStatusState,
} from "~/components/atoms";
import { classNames } from "~/utilities/string_utilities";
import { CustomTable } from "~/components/molecules/custom_table";
import type { CaseData } from "~/modules/laywer/cases/features/personal_cases/types";

interface User {
  name: string;
  imageUrl: string;
}

interface TableCaseData extends CaseData {
  user: User;
  folder: string;
  status: string;
  case: string;
  date: string;
  dateTime: string;
  commit: string;
}

interface TableProps {
  data?: TableCaseData[];
  isLoading?: boolean;
  error?: Error | null;
}

const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Error: "text-rose-400 bg-rose-400/10",
  Progress: "text-yellow-400 bg-yellow-400/10",
};

const categories = [
  {
    id: 1,
    name: "Consultas",
  },
  {
    id: 2,
    name: "Asesoria legal",
  },
  {
    id: 3,
    name: "Representación legal",
  },
  {
    id: 4,
    name: "Laboral",
  },
];

const columns = [
  {
    width: "w-1/12",
    header: {
      icon: <IdentificationIcon className="size-5 text-gray-500" />,
      label: "Identificador",
    },
    accessor: "commit",
    align: "left" as const,
  },
  {
    width: "w-3/12",
    header: {
      icon: <DocumentIcon className="size-5 text-gray-500" />,
      label: "Caso",
    },
    accessor: "case",
    align: "left" as const,
  },
  {
    width: "w-1/12",
    header: {
      icon: <UserIcon className="size-5 text-gray-500" />,
      label: "Usuario",
    },
    accessor: "user",
    align: "left" as const,
    renderCell: (value: User) => (
      <div className="flex items-center gap-x-4">
        <CustomAvatar
          altText={value.name}
          avatar={value.imageUrl}
          size="2rem"
          username={value.name}
        />
        <div className="truncate text-sm/6 font-medium text-gray-700">
          {value.name}
        </div>
      </div>
    ),
  },
  {
    width: "w-1/12",
    header: {
      icon: <FolderIcon className="size-5 text-gray-500" />,
      label: "Estado",
    },
    accessor: "status",
    align: "left" as const,
    renderCell: (value: string) => (
      <div className="flex items-center justify-end gap-x-2 sm:justify-start">
        <div
          className={classNames(
            statuses[value as keyof typeof statuses],
            "flex-none rounded-sm p-1"
          )}
        >
          <div className="size-1.5 rounded-sm bg-current" />
        </div>
        <div className="text-gray-700">{value}</div>
      </div>
    ),
  },
  {
    width: "w-1/12",
    header: {
      icon: <ClockIcon className="size-5 text-gray-500" />,
      label: "Reciente",
    },
    accessor: "date",
    align: "left" as const,
    renderCell: (value: string, row: TableCaseData) => (
      <time dateTime={row.dateTime}>{value}</time>
    ),
  },
];

export const Table = ({ data = [], isLoading = false, error }: TableProps) => {
  const [category, setCategory] = useState(categories[0]);

  const handleRowClick = (row: TableCaseData) => {
    console.log("Row clicked:", row);
  };

  if (isLoading) {
    return (
      <div className="w-full mt-2">
        <div className="bg-gray-200 px-4 py-4 rounded-lg shadow-sm animate-pulse">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-300 animate-pulse rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <CustomStatusState
        title="Error al cargar los casos"
        message="Sucedió un error al cargar los casos, por favor intente nuevamente, si el problema persiste, por favor contacte al soporte."
      />
    );
  }

  return (
    <div className="w-full mt-2">
      <div className="bg-white px-4 py-4 rounded-lg shadow-sm transition-all hover:shadow-md">
        <div className="flex lg:items-center justify-between flex-col lg:flex-row gap-4 flex-wrap">
          <div className="">
            <h1 className="text-lg font-bold text-gray-900 text-left">
              Tus casos recientes
            </h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="md:w-96 w-full">
              <CustomInput
                startAdornment={
                  <MagnifyingGlassIcon className="size-4 text-gray-500" />
                }
                placeholder="Buscar caso..."
              />
            </div>
            <CustomSelector
              options={categories}
              selected={category}
              onChange={setCategory}
            />
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="mt-2">
          <CustomStatusState
            title="No hay casos registrados"
            message="Aún no tienes casos registrados. Los casos aparecerán aquí cuando se creen, por el momento puedes crear un caso desde el botón de crear caso."
          />
        </div>
      ) : (
        <CustomTable
          columns={columns}
          data={data}
          onRowClick={handleRowClick}
          className="mt-2"
        />
      )}
    </div>
  );
};
