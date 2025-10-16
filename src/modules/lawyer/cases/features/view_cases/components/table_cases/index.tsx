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
import { CaseStatusLabel, CaseUrgencyLabel, type Case } from "@/types";
import { LoadingState, ErrorState, EmptyState, Filters } from "../";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { useDebounce } from "@/hooks";
import {
  ArchiveIcon,
  CalendarDaysIcon,
  CircleCheckIcon,
  EyeIcon,
  FileTextIcon,
  Hash,
  PencilIcon,
  TagIcon,
  TriangleAlertIcon,
} from "lucide-react";
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
  const [urgency, setUrgency] = useState<string | undefined>(undefined);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cases", page, debouncedSearch, category, status, urgency],
    queryFn: () => getCases(page, debouncedSearch, category, status, urgency),
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

  const handleSoon = () => {
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
        urgency={urgency}
        setUrgency={setUrgency}
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
                  <TableHead className="w-[150px]">
                    <span className="flex items-center gap-2">
                      <Hash className="size-4 text-muted-foreground" />
                      Número de caso
                    </span>
                  </TableHead>
                  <TableHead>
                    <span className="flex items-center gap-2">
                      <FileTextIcon className="size-4 text-muted-foreground" />
                      Título del caso
                    </span>
                  </TableHead>
                  <TableHead className="w-[150px]">
                    <span className="flex items-center gap-2">
                      <CircleCheckIcon className="size-4 text-muted-foreground" />
                      Estado
                    </span>
                  </TableHead>
                  <TableHead className="w-[150px]">
                    <span className="flex items-center gap-2">
                      <TriangleAlertIcon className="size-4 text-muted-foreground" />
                      Urgencia
                    </span>
                  </TableHead>
                  <TableHead className="w-[150px]">
                    <span className="flex items-center gap-2">
                      <TagIcon className="size-4 text-muted-foreground" />
                      Categoría
                    </span>
                  </TableHead>
                  <TableHead className="w-[180px]">
                    <span className="flex items-center gap-2">
                      <CalendarDaysIcon className="size-4 text-muted-foreground" />
                      Fecha de creación
                    </span>
                  </TableHead>
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
                        <TableCell className="w-[150px] ">
                          <Badge variant="secondary">
                            {CaseUrgencyLabel[caso.urgency]}
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
                      <ContextMenuItem onClick={() => handleSoon()}>
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
