import { useQuery } from "@tanstack/react-query";
import { explorerCases } from "../../services";
import {
  AsyncBoundary,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  PaginationController,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui";
import { LoadingState, ErrorState, EmptyState, TakeCaseDialog } from "../";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { type Case } from "@/types";
import { useState } from "react";
import { Filters } from "../filters";
import { useDebounce } from "@/hooks";
import {
  CalendarDaysIcon,
  EyeIcon,
  FileTextIcon,
  Hash,
  TagIcon,
} from "lucide-react";
import { toast } from "sonner";

export const TableCases = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [caseSelect, setCaseSelect] = useState<Case>();
  const debouncedSearch = useDebounce(search, 500);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cases", page, debouncedSearch, category],
    queryFn: () => explorerCases(page, debouncedSearch, category),
  });

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
                      <TableRow className="cursor-context-menu">
                        <TableCell className="w-[150px] uppercase">
                          #{caso.id.slice(0, 8)}
                        </TableCell>
                        <TableCell>{caso.title}</TableCell>
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
                    <ContextMenuContent className="w-64">
                      <ContextMenuItem onClick={() => handleSoonToast()}>
                        <EyeIcon className="w-4 h-4" />
                        <span>Ver detalles del caso</span>
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => {
                          setOpen(true);
                          setCaseSelect(caso);
                        }}
                      >
                        <FileTextIcon className="w-4 h-4" />
                        <span>Tomar caso</span>
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

      <TakeCaseDialog
        open={open}
        setOpen={setOpen}
        titleCase={caseSelect?.title || ""}
        id={caseSelect?.id || ""}
      />
    </div>
  );
};
