import {
  ClockIcon,
  DocumentIcon,
  IdentificationIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CustomAvatar, CustomInput, CustomSelector } from "~/components/atoms";
import { classNames } from "~/utilities/string_utilities";
import { CustomTable } from "~/components/molecules/custom_table";
import { useCasesStore } from "~/modules/cases/store/cases.store";
import type { Case } from "~/modules/cases/store/cases.store";

const statuses = {
  pending: "text-yellow-400 bg-yellow-400/10",
  in_progress: "text-blue-400 bg-blue-400/10",
  completed: "text-green-400 bg-green-400/10",
  cancelled: "text-rose-400 bg-rose-400/10",
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
    accessor: "id",
    align: "left" as const,
  },
  {
    width: "w-3/12",
    header: {
      icon: <DocumentIcon className="size-5 text-gray-500" />,
      label: "Caso",
    },
    accessor: "title",
    align: "left" as const,
  },
  {
    width: "w-1/12",
    header: {
      icon: <UserIcon className="size-5 text-gray-500" />,
      label: "Cliente",
    },
    accessor: "client",
    align: "left" as const,
    renderCell: (value: Case["client"]) => (
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
    renderCell: (value: Case["status"]) => (
      <div className="flex items-center justify-end gap-x-2 sm:justify-start">
        <div
          className={classNames(statuses[value], "flex-none rounded-sm p-1")}
        >
          <div className="size-1.5 rounded-sm bg-current" />
        </div>
        <div className="text-gray-700">
          {value === "pending" && "Pendiente"}
          {value === "in_progress" && "En progreso"}
          {value === "completed" && "Completado"}
          {value === "cancelled" && "Cancelado"}
        </div>
      </div>
    ),
  },
  {
    width: "w-1/12",
    header: {
      icon: <ClockIcon className="size-5 text-gray-500" />,
      label: "Creado",
    },
    accessor: "createdAt",
    align: "left" as const,
    renderCell: (value: string) => (
      <time dateTime={value}>
        {new Date(value).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
    ),
  },
];

export const Table = () => {
  const [category, setCategory] = useState(categories[0]);
  const cases = useCasesStore((state) => state.cases);

  const handleRowClick = (row: Case) => {
    console.log("Row clicked:", row);
  };

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

      <CustomTable
        columns={columns}
        data={cases}
        onRowClick={handleRowClick}
        className="mt-2"
      />
    </div>
  );
};
