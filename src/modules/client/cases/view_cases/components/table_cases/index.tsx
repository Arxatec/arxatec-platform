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
} from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { getCases } from "../../services";
import { type Case } from "@/types";
import { LoadingState, ErrorState, EmptyState, Filters } from "../";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { useDebounce } from "@/hooks";

export const TableCases = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cases", page, debouncedSearch, category, status],
    queryFn: () => getCases(page, debouncedSearch, category, status),
  });

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
                  <TableRow key={caso.id}>
                    <TableCell className="w-[150px] uppercase">
                      #{caso.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>{caso.title}</TableCell>
                    <TableCell className="w-[150px] ">
                      <Badge className="capitalize" variant="secondary">
                        {caso.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="w-[150px] capitalize">
                      {caso.category}
                    </TableCell>
                    <TableCell className="w-[180px]">
                      {formatDate(caso.created_at, "dd 'de' MMMM 'del' yyyy", {
                        locale: es,
                      })}
                    </TableCell>
                  </TableRow>
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
