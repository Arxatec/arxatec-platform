import {
  DocumentIcon,
  IdentificationIcon,
  UserIcon,
  FolderIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { CustomInput, CustomSelector } from "~/components/atoms";
import { CustomTable } from "~/components/molecules/custom_table";
import { APP_PATHS } from "~/routes/routes";

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
    renderCell: (value: string, row: any) => (
      <div className="flex items-center gap-3">
        <div className="relative size-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          {row.clientImage && (
            <img src={row.clientImage} alt={value} className="object-cover" />
          )}
        </div>
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

const data = [
  {
    id: "ARX-2025-001",
    title: "Demanda por incumplimiento de contrato de servicios",
    client: "Empresa Tech Solutions S.A.",
    clientImage:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Civil",
    startDate: "01/03/2025",
  },
  {
    id: "ARX-2025-002",
    title: "Defensa en caso de acoso laboral",
    client: "Juan Pérez Martínez",
    clientImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Laboral",
    startDate: "02/03/2025",
  },
  {
    id: "ARX-2025-003",
    title: "Proceso de divorcio contencioso",
    client: "María García López",
    clientImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Familiar",
    startDate: "03/03/2025",
  },
  {
    id: "ARX-2025-004",
    title: "Defensa en caso de estafa financiera",
    client: "Compañía de Seguros XYZ",
    clientImage:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Penal",
    startDate: "04/03/2025",
  },
  {
    id: "ARX-2025-005",
    title: "Reclamación de daños por accidente de tráfico",
    client: "Carlos Rodríguez Sánchez",
    clientImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Civil",
    startDate: "05/03/2025",
  },
  {
    id: "ARX-2025-006",
    title: "Demanda por despido improcedente",
    client: "Laura Fernández Gómez",
    clientImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Laboral",
    startDate: "06/03/2025",
  },
  {
    id: "ARX-2025-007",
    title: "Proceso de adopción internacional",
    client: "Familia Martínez García",
    clientImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Familiar",
    startDate: "07/03/2025",
  },
  {
    id: "ARX-2025-008",
    title: "Defensa en caso de fraude fiscal",
    client: "Empresa Constructora ABC",
    clientImage:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Penal",
    startDate: "08/03/2025",
  },
  {
    id: "ARX-2025-009",
    title: "Reclamación de indemnización por daños y perjuicios",
    client: "Ana López Pérez",
    clientImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Civil",
    startDate: "09/03/2025",
  },
  {
    id: "ARX-2025-010",
    title: "Negociación de convenio colectivo",
    client: "Sindicato de Trabajadores",
    clientImage:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Laboral",
    startDate: "10/03/2025",
  },
  {
    id: "ARX-2025-011",
    title: "Proceso de tutela de menores",
    client: "Familia Sánchez Ruiz",
    clientImage:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Familiar",
    startDate: "11/03/2025",
  },
  {
    id: "ARX-2025-012",
    title: "Defensa en caso de apropiación indebida",
    client: "Banco Financiero S.A.",
    clientImage:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Penal",
    startDate: "12/03/2025",
  },
  {
    id: "ARX-2025-013",
    title: "Reclamación de responsabilidad civil",
    client: "Clínica Médica XYZ",
    clientImage:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Civil",
    startDate: "13/03/2025",
  },
  {
    id: "ARX-2025-014",
    title: "Demanda por discriminación laboral",
    client: "Miguel Ángel Torres",
    clientImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Laboral",
    startDate: "14/03/2025",
  },
  {
    id: "ARX-2025-015",
    title: "Proceso de modificación de medidas",
    client: "Familia García Martín",
    clientImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Familiar",
    startDate: "15/03/2025",
  },
  {
    id: "ARX-2025-016",
    title: "Defensa en caso de blanqueo de capitales",
    client: "Empresa Inversiones Global",
    clientImage:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Penal",
    startDate: "16/03/2025",
  },
  {
    id: "ARX-2025-017",
    title: "Reclamación de indemnización por daños materiales",
    client: "Compañía de Seguros DEF",
    clientImage:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Civil",
    startDate: "17/03/2025",
  },
  {
    id: "ARX-2025-018",
    title: "Negociación de finiquito",
    client: "Roberto Jiménez Díaz",
    clientImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Laboral",
    startDate: "18/03/2025",
  },
  {
    id: "ARX-2025-019",
    title: "Proceso de guarda y custodia",
    client: "Familia López García",
    clientImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Familiar",
    startDate: "19/03/2025",
  },
  {
    id: "ARX-2025-020",
    title: "Defensa en caso de cohecho",
    client: "Ayuntamiento de la Ciudad",
    clientImage:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Penal",
    startDate: "20/03/2025",
  },
  {
    id: "ARX-2025-021",
    title: "Reclamación de responsabilidad patrimonial",
    client: "Administración Pública",
    clientImage:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Civil",
    startDate: "21/03/2025",
  },
  {
    id: "ARX-2025-022",
    title: "Demanda por acoso sexual en el trabajo",
    client: "Sara Martínez Ruiz",
    clientImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Laboral",
    startDate: "22/03/2025",
  },
  {
    id: "ARX-2025-023",
    title: "Proceso de adopción nacional",
    client: "Familia Pérez Sánchez",
    clientImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Familiar",
    startDate: "23/03/2025",
  },
  {
    id: "ARX-2025-024",
    title: "Defensa en caso de malversación de fondos",
    client: "Fundación Cultural ABC",
    clientImage:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Penal",
    startDate: "24/03/2025",
  },
  {
    id: "ARX-2025-025",
    title: "Reclamación de daños por negligencia médica",
    client: "Paciente Anónimo",
    clientImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Civil",
    startDate: "25/03/2025",
  },
  {
    id: "ARX-2025-026",
    title: "Negociación de condiciones laborales",
    client: "Sindicato de Profesionales",
    clientImage:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Laboral",
    startDate: "26/03/2025",
  },
  {
    id: "ARX-2025-027",
    title: "Proceso de modificación de pensión alimenticia",
    client: "Familia Rodríguez Pérez",
    clientImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Familiar",
    startDate: "27/03/2025",
  },
  {
    id: "ARX-2025-028",
    title: "Defensa en caso de tráfico de influencias",
    client: "Empresa Constructora Municipal",
    clientImage:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Penal",
    startDate: "28/03/2025",
  },
  {
    id: "ARX-2025-029",
    title: "Reclamación de daños por incumplimiento contractual",
    client: "Empresa Distribuidora GHI",
    clientImage:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Civil",
    startDate: "29/03/2025",
  },
  {
    id: "ARX-2025-030",
    title: "Demanda por discriminación salarial",
    client: "Asociación de Mujeres Profesionales",
    clientImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "Laboral",
    startDate: "30/03/2025",
  },
];

export default function ExploreCasesPage() {
  const navigate = useNavigate();
  const onBack = () => navigate(APP_PATHS.CASES);
  return (
    <div className="mx-auto max-w-6xl px-6 min-h-screen">
      <div className="flex items-center justify-between mb-2 gap-2">
        <button
          onClick={onBack}
          className="flex items-center bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
        >
          <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
        </button>
        <div className="bg-white p-4 w-full  rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
          <h2 className="text-base font-bold">Explorar casos</h2>
        </div>
      </div>
      <div className="flex gap-2 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
        <div className="w-full">
          <CustomInput
            placeholder="Buscar..."
            className="w-full"
            startAdornment={
              <MagnifyingGlassIcon className="size-5 text-gray-500" />
            }
          />
        </div>
        <div className="w-56">
          <CustomSelector
            options={[
              { id: "all", name: "Todos" },
              { id: "civil", name: "Civil" },
              { id: "laboral", name: "Laboral" },
              { id: "familiar", name: "Familiar" },
              { id: "penal", name: "Penal" },
            ]}
            selected={{ id: "all", name: "Todos" }}
            onChange={() => {}}
          />
        </div>
        <div className="w-56">
          <CustomSelector
            options={[
              { id: "Más antiguo", name: "Más antiguo" },
              { id: "Más reciente", name: "Más reciente" },
            ]}
            selected={{ id: "Más reciente", name: "Más reciente" }}
            onChange={() => {}}
          />
        </div>
      </div>
      <CustomTable
        columns={columns}
        data={data}
        onRowClick={(row) => console.log(row)}
      />
    </div>
  );
}
