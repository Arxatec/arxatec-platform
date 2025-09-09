import {
  Button,
  TableHead,
  Table,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  PaginationItem,
  Pagination,
  PaginationNext,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationPrevious,
} from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const cases = [
  {
    id: 1,
    number: "IG-001",
    title: "Denuncia de violencia doméstica",
    status: "Activo",
    createdAt: "04 de junio del 2025",
  },
  {
    id: 2,
    number: "IG-002",
    title: "Robo de vehículo",
    status: "En proceso",
    createdAt: "10 de junio del 2025",
  },
  {
    id: 3,
    number: "IG-003",
    title: "Fraude bancario",
    status: "Archivado",
    createdAt: "15 de junio del 2025",
  },
  {
    id: 4,
    number: "IG-004",
    title: "Demanda laboral por despido injustificado",
    status: "Activo",
    createdAt: "20 de junio del 2025",
  },
  {
    id: 5,
    number: "IG-005",
    title: "Custodia de menor",
    status: "En revisión",
    createdAt: "22 de junio del 2025",
  },
  {
    id: 6,
    number: "IG-006",
    title: "Accidente de tránsito",
    status: "Activo",
    createdAt: "25 de junio del 2025",
  },
  {
    id: 7,
    number: "IG-007",
    title: "Demanda por incumplimiento de contrato",
    status: "En proceso",
    createdAt: "28 de junio del 2025",
  },
  {
    id: 8,
    number: "IG-008",
    title: "Estafa inmobiliaria",
    status: "Archivado",
    createdAt: "01 de julio del 2025",
  },
  {
    id: 9,
    number: "IG-009",
    title: "Amenazas y hostigamiento",
    status: "Activo",
    createdAt: "03 de julio del 2025",
  },
  {
    id: 10,
    number: "IG-010",
    title: "Delito informático",
    status: "En proceso",
    createdAt: "05 de julio del 2025",
  },
  {
    id: 11,
    number: "IG-011",
    title: "Demanda de alimentos",
    status: "Activo",
    createdAt: "07 de julio del 2025",
  },
  {
    id: 12,
    number: "IG-012",
    title: "Falsificación de documentos",
    status: "Archivado",
    createdAt: "09 de julio del 2025",
  },
  {
    id: 13,
    number: "IG-013",
    title: "Propiedad intelectual",
    status: "En revisión",
    createdAt: "11 de julio del 2025",
  },
  {
    id: 14,
    number: "IG-014",
    title: "Difamación y calumnias",
    status: "Activo",
    createdAt: "14 de julio del 2025",
  },
  {
    id: 15,
    number: "IG-015",
    title: "Tenencia de armas",
    status: "En proceso",
    createdAt: "16 de julio del 2025",
  },
  {
    id: 16,
    number: "IG-016",
    title: "Delito ambiental",
    status: "Activo",
    createdAt: "18 de julio del 2025",
  },
  {
    id: 17,
    number: "IG-017",
    title: "Violación de propiedad privada",
    status: "Archivado",
    createdAt: "20 de julio del 2025",
  },
  {
    id: 18,
    number: "IG-018",
    title: "Demanda de pensión",
    status: "En revisión",
    createdAt: "22 de julio del 2025",
  },
  {
    id: 19,
    number: "IG-019",
    title: "Lesiones personales",
    status: "Activo",
    createdAt: "24 de julio del 2025",
  },
  {
    id: 20,
    number: "IG-020",
    title: "Evación de impuestos",
    status: "En proceso",
    createdAt: "26 de julio del 2025",
  },
  {
    id: 21,
    number: "IG-021",
    title: "Tráfico de influencias",
    status: "Archivado",
    createdAt: "28 de julio del 2025",
  },
  {
    id: 22,
    number: "IG-022",
    title: "Suplantación de identidad",
    status: "Activo",
    createdAt: "30 de julio del 2025",
  },
  {
    id: 23,
    number: "IG-023",
    title: "Demanda de herencia",
    status: "En proceso",
    createdAt: "01 de agosto del 2025",
  },
  {
    id: 24,
    number: "IG-024",
    title: "Contrabando de mercancías",
    status: "Activo",
    createdAt: "03 de agosto del 2025",
  },
  {
    id: 25,
    number: "IG-025",
    title: "Corrupción administrativa",
    status: "Archivado",
    createdAt: "05 de agosto del 2025",
  },
  {
    id: 26,
    number: "IG-026",
    title: "Demanda de arrendamiento",
    status: "En revisión",
    createdAt: "07 de agosto del 2025",
  },
  {
    id: 27,
    number: "IG-027",
    title: "Estafa comercial",
    status: "Activo",
    createdAt: "09 de agosto del 2025",
  },
  {
    id: 28,
    number: "IG-028",
    title: "Acoso laboral",
    status: "En proceso",
    createdAt: "11 de agosto del 2025",
  },
  {
    id: 29,
    number: "IG-029",
    title: "Delito contra la salud pública",
    status: "Activo",
    createdAt: "13 de agosto del 2025",
  },
  {
    id: 30,
    number: "IG-030",
    title: "Demanda por daños y perjuicios",
    status: "Archivado",
    createdAt: "15 de agosto del 2025",
  },
];

export default function ViewCasesPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold font-serif">Mis casos</h1>
        <Link to={ROUTES.Lawyer.CreateCase}>
          <Button>
            <PlusIcon />
            Nuevo caso
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Número de caso</TableHead>
            <TableHead>Título del caso</TableHead>
            <TableHead className="w-[150px]">Estado</TableHead>
            <TableHead className="w-[180px]">Fecha de creación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((caso, index) => (
            <TableRow key={caso.id ?? index}>
              <TableCell className="w-[150px]">{caso.number}</TableCell>
              <TableCell>{caso.title}</TableCell>
              <TableCell className="w-[150px]">{caso.status}</TableCell>
              <TableCell className="w-[180px]">{caso.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
