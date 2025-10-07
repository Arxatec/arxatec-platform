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
  ContextMenuSeparator,
} from "@/components/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArchivedCases, getCases } from "../../services";
import { CaseStatusLabel, type Case } from "@/types";
import { LoadingState, ErrorState, EmptyState, Filters } from "../";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { useDebounce } from "@/hooks";
import { ArchiveIcon, EyeIcon, PencilIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { toast } from "sonner";

export const TableCases = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cases", page, debouncedSearch, category, status],
    queryFn: () => getCases(page, debouncedSearch, category, status),
  });

  const handleViewCase = (id: string) => {
    navigate(ROUTES.Lawyer.ViewCase.replace(":id", id));
  };

  const { mutateAsync: archiveCase } = useMutation({
    mutationFn: (id: string) => getArchivedCases(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
    onError: (error) => {
      toast.error("Error al archivar caso.", {
        description: error.message,
      });
    },
  });

  const handleArchiveCase = async (id: string) => {
    toast.promise(archiveCase(id), {
      loading: "Archivando caso...",
      success: "Caso archivado correctamente.",
    });
  };

  const handleUpdateCase = (id: string) => {
    navigate(ROUTES.Lawyer.UpdateCase.replace(":id", id));
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
                        key={caso.id}
                        onClick={() => handleViewCase(caso.id)}
                        className="cursor-pointer"
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
                        <TableCell className="w-[150px] capitalize">
                          {caso.category}
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
                      <ContextMenuItem onClick={() => handleViewCase(caso.id)}>
                        <EyeIcon className="w-4 h-4" />
                        <span>Ver detalle del caso</span>
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => handleUpdateCase(caso.id)}
                      >
                        <PencilIcon className="w-4 h-4" />
                        <span>Editar caso</span>
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem
                        onClick={() => handleArchiveCase(caso.id)}
                      >
                        <ArchiveIcon className="w-4 h-4" />
                        <span>Archivar caso</span>
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
