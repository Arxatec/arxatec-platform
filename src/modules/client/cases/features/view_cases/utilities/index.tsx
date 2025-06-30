import {
  CalendarDaysIcon,
  DocumentIcon,
  SignalIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const categories = {
  1: "Derecho penal",
  2: "Derecho civil",
  3: "Derecho laboral",
  4: "Derecho comercial",
  5: "Derecho de familia",
};

const statuses = {
  1: "Registrado",
  2: "En revisión",
  3: "En proceso",
  4: "Con resolución",
  5: "Cerrado",
};

export const columnsTable = [
  {
    width: "w-6/12",
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
    width: "w-1/12",
    header: {
      icon: <SignalIcon className="size-5 text-gray-500" />,
      label: "Estado",
    },
    accessor: "status_id",
    align: "left" as const,
    renderCell: (value: string) => {
      return <span className="text-gray-700">{statuses[value]}</span>;
    },
  },
  {
    width: "w-1/12",
    header: {
      icon: <TagIcon className="size-5 text-gray-500" />,
      label: "Categoria",
    },
    accessor: "category_id",
    align: "left" as const,
    renderCell: (value: string) => {
      return <span className="text-gray-700">{categories[value]}</span>;
    },
  },
  {
    width: "w-1/12",
    header: {
      icon: <CalendarDaysIcon className="size-5 text-gray-500" />,
      label: "Fecha de Creación",
    },
    accessor: "created_at",
    align: "left" as const,
    renderCell: (value: string) => {
      const date = new Date(value);
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
];
