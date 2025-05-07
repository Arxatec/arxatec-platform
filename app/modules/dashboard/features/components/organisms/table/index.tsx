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
  PrimaryButton,
} from "~/components/atoms";
import { classNames } from "~/utilities/string_utilities";
import { CustomTable } from "~/components/molecules/custom_table";

type Person = { name: string; title: string; email: string; role: string }; // Define la estructura de los elementos en people

const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Error: "text-rose-400 bg-rose-400/10",
  Progress: "text-yellow-400 bg-yellow-400/10",
};

const activityItems = [
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "2d89f0c8",
    folder: "penal",
    status: "Completed",
    case: "Defensa de un empresario acusado de evasión fiscal tras una auditoría sorpresa.",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Lindsay Walton",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "249df660",
    folder: "laboral",
    status: "Completed",
    case: "Demanda contra una empresa por despido injustificado de una empleada con 15 años de antigüedad.",
    date: "3 hours ago",
    dateTime: "2023-01-23T09:00",
  },
  {
    user: {
      name: "Courtney Henry",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "11464223",
    folder: "civil",
    status: "Error",
    case: "Conflicto vecinal por ruidos molestos y construcción ilegal de una ampliación.",
    date: "12 hours ago",
    dateTime: "2023-01-23T00:00",
  },
  {
    user: {
      name: "Courtney Henry",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "dad28e95",
    folder: "familiar",
    status: "Completed",
    case: "Proceso de divorcio con disputa por la custodia de dos hijos menores.",
    date: "2 days ago",
    dateTime: "2023-01-21T13:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "624bc94c",
    folder: "mercantil",
    status: "Progress",
    case: "Demanda por incumplimiento de contrato entre dos empresas tecnológicas.",
    date: "5 days ago",
    dateTime: "2023-01-18T12:34",
  },
  {
    user: {
      name: "Courtney Henry",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "e111f80e",
    folder: "penal",
    status: "Completed",
    case: "Defensa de una empresa acusada de contaminación ambiental en una reserva natural.",
    date: "1 week ago",
    dateTime: "2023-01-16T15:54",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "5e136005",
    folder: "civil",
    status: "Progress",
    case: "Reclamación de daños tras un accidente de tráfico con un conductor sin seguro.",
    date: "1 week ago",
    dateTime: "2023-01-16T11:31",
  },
  {
    user: {
      name: "Whitney Francis",
      imageUrl:
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "5c1fd07f",
    folder: "laboral",
    status: "Completed",
    case: "Negociación de indemnización para un grupo de empleados despedidos sin justificación.",
    date: "2 weeks ago",
    dateTime: "2023-01-09T08:45",
  },
];

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
const filterBy = [
  {
    id: 5,
    name: "Última semana",
  },
  {
    id: 1,
    name: "Último mes",
  },
  {
    id: 2,
    name: "Últimos 3 meses",
  },
  {
    id: 3,
    name: "Últimos 6 meses",
  },
  {
    id: 4,
    name: "Último año",
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
    renderCell: (value: any) => (
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
    renderCell: (value: string, row: any) => (
      <time dateTime={row.dateTime}>{value}</time>
    ),
  },
];

export const Table = () => {
  const [category, setCategory] = useState(categories[0]);
  const [filter, setFilter] = useState(filterBy[0]);

  const handleRowClick = (row: any) => {
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
        data={activityItems}
        onRowClick={handleRowClick}
        className="mt-2"
      />
    </div>
  );
};
