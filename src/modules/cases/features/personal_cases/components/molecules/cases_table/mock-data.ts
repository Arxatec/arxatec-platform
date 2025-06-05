import { CaseStatus } from "../../atoms";

export const mockCases = [
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
  // ... (aquí irían todos los otros casos)
];
