import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  AsyncBoundary,
  Badge,
  PaginationController,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { getCases } from "../../services";
import {
  CaseCategoryLabel,
  CaseStatus,
  CaseStatusLabel,
  type Case,
} from "@/types";
import { LoadingState, ErrorState, EmptyState, Filters } from "../";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { useDebounce } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { EyeIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

export const TableCases = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cases", page, debouncedSearch, category, status],
    queryFn: () => getCases(page, debouncedSearch, category, status),
  });

  const handleViewCase = (id: string, status: string) => {
    if (status === CaseStatus.IN_PENDING) {
      navigate(ROUTES.Client.ViewCase.replace(":id", id));
      return;
    }
    toast.info("Próximamente disponible", {
      description:
        "Actualmente estamos trabajando en esta funcionalidad, solo puedes ver el detalle de los casos en progreso.",
    });
  };

  const handleSoonToast = () => {
    toast.info("Próximamente disponible", {
      description:
        "Actualmente estamos trabajando en esta funcionalidad, pronto estará disponible.",
    });
  };

  return (
    <div>
      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
      />
      <AsyncBoundary
        isLoading={isPending}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState error={error?.message} />}
        EmptyComponent={<EmptyState />}
        isError={isError}
        data={data?.cases ?? []}
      >
        {(cases) => (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Número de caso</TableHead>
                  <TableHead>Título del caso</TableHead>
                  <TableHead className="w-[150px]">Estado</TableHead>
                  <TableHead className="w-[150px]">Categoría</TableHead>
                  <TableHead className="w-[180px]">Fecha de creación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases?.map((caso: Case) => (
                  <ContextMenu key={caso.id}>
                    <ContextMenuTrigger asChild>
                      <TableRow
                        onClick={() => handleViewCase(caso.id, caso.status)}
                      >
                        <TableCell className="w-[150px] uppercase">
                          #{caso.id.slice(0, 8)}
                        </TableCell>
                        <TableCell>{caso.title}</TableCell>
                        <TableCell className="w-[150px] ">
                          <Badge variant="secondary">
                            {CaseStatusLabel[caso.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="w-[150px]">
                          {CaseCategoryLabel[caso.category]}
                        </TableCell>
                        <TableCell className="w-[180px]">
                          {formatDate(
                            caso.created_at,
                            "dd 'de' MMMM 'del' yyyy",
                            {
                              locale: es,
                            }
                          )}
                        </TableCell>
                      </TableRow>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem
                        onClick={() => handleViewCase(caso.id, caso.status)}
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>Ver detalle del caso</span>
                      </ContextMenuItem>
                      <ContextMenuItem onClick={() => handleSoonToast()}>
                        <XIcon className="w-4 h-4" />
                        <span>Cancelar caso</span>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4">
              <PaginationController
                setPage={setPage}
                pagination={
                  data?.pagination ?? {
                    page: 1,
                    limit: 20,
                    total: 0,
                    total_pages: 1,
                  }
                }
              />
            </div>
          </>
        )}
      </AsyncBoundary>
    </div>
  );
};
