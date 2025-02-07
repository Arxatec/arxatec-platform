import { useState } from "react";

const SearchIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ListIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

const GridIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

interface Case {
  id: string;
  title: string;
  client: string;
  nextCourtDate: string;
  created: string;
  status: "PENDIENTE" | "ACEPTADO" | "CERRADO" | "CANCELADO";
  isNew?: boolean;
}

export default function ViewCasesPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filter, setFilter] = useState("Open Cases");

  const cases: Case[] = [
    {
      id: "CASE-001",
      title: "Me robaron el celular, ¿cómo denuncio?",
      client: "Juan Pérez",
      nextCourtDate: "10/03/2025",
      created: "07 de febrero de 2025",
      status: "PENDIENTE",
      isNew: true,
    },
    {
      id: "CASE-002",
      title: "Quiero divorciarme, ¿cuáles son los pasos?",
      client: "María López",
      nextCourtDate: "15/03/2025",
      created: "05 de febrero de 2025",
      status: "ACEPTADO",
      isNew: false,
    },
    {
      id: "CASE-003",
      title: "Me despidieron injustamente, ¿qué puedo hacer?",
      client: "Carlos Gómez",
      nextCourtDate: "20/03/2025",
      created: "02 de febrero de 2025",
      status: "CERRADO",
      isNew: true,
    },
    {
      id: "CASE-004",
      title: "Mi arrendador quiere desalojarme sin aviso previo",
      client: "Ana Rodríguez",
      nextCourtDate: "25/03/2025",
      created: "30 de enero de 2025",
      status: "PENDIENTE",
      isNew: false,
    },
    {
      id: "CASE-005",
      title: "Quiero registrar mi marca comercial",
      client: "Empresa Innovatech S.A.",
      nextCourtDate: "05/04/2025",
      created: "28 de enero de 2025",
      status: "ACEPTADO",
      isNew: false,
    },
    {
      id: "CASE-006",
      title: "Sufrí un accidente de tránsito y quiero reclamar daños",
      client: "Luis Fernández",
      nextCourtDate: "12/04/2025",
      created: "25 de enero de 2025",
      status: "CANCELADO",
      isNew: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACEPTADO":
        return "bg-indigo-600";
      case "CANCELADO":
        return "bg-rose-600";
      case "PENDIENTE":
        return "bg-blue-600";
      case "CERRADO":
        return "bg-gray-400";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="p-6 bg-white rounded-md max-w-7xl mx-auto">
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Casos</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-semibold">
            Nuevo caso
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-xl">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search cases or clients"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-gray-100" : ""
                }`}
              >
                <ListIcon />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-gray-100" : ""
                }`}
              >
                <GridIcon />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Viewing:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Open Cases</option>
                <option>Closed Cases</option>
                <option>All Cases</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {cases.map((case_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{case_.id}</span>
                    {case_.isNew && (
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mt-1">{case_.title}</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-24">Client:</span>
                      <span className="font-medium">{case_.client}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-24">Next Court Date:</span>
                      <span className="font-medium">{case_.nextCourtDate}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-24">Created:</span>
                      <span>{case_.created}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-bold text-white rounded ${getStatusColor(
                    case_.status
                  )}`}
                >
                  {case_.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
